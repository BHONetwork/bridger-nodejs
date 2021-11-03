import { inject, injectable } from 'inversify';
import { IService } from '@lib/task';
import { BholdusBscTaskBus } from '../bus';
import { ApiPromise, WsProvider } from '@polkadot/api';
import getApiOptions from '@bholdus/api-options';
import { ethers } from 'ethers';
import { BholdusWriterMessage } from '../message'
import { SubjectLike, Subject } from 'rxjs';
import '@bholdus/types'
import { BscPrimitivesBscHeader } from '@bholdus/types/interfaces'
import { Bytes } from '@polkadot/types';


@injectable()
export class BscHeaderListenerService implements IService<BholdusBscTaskBus> {
	static symbol = Symbol(BscHeaderListenerService.name);
	@inject(BholdusBscTaskBus.symbol) private bus: BholdusBscTaskBus;

	async start(): Promise<void> {
		// const subject = this.bus.channel(BholdusWriterMessage);
		
		const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org:443");

		const wsProvider = new WsProvider("ws://127.0.0.1:9944");
		const api = await ApiPromise.create(getApiOptions({ provider: wsProvider }));

		const latestBlock = await api.query.bsc.finalizedCheckpoint();

		const blockNumber = Number(latestBlock.number.toBigInt() + BigInt("200"));

		let epockBlock = await this.getBlock(blockNumber, api, provider);

		console.log(epockBlock);

		let listBlock = [epockBlock];

		for (let index = 1;index < (epockBlock.get("extraData").toU8a().length + 1)/2; index++) {
			const block = await this.getBlock(blockNumber + index, api, provider);
			listBlock.push(block);
		}

		console.log(listBlock.length);

		let listBlockSubmit = api.createType("Vec<BscPrimitivesBscHeader>", listBlock);

		console.log(listBlockSubmit[1].get("number").toString());

		// this.bus.channel(BholdusWriterMessage).next({next:(message:BholdusWriterMessage) =>{
        //     listBlockSubmit
        // }})

	}

	async getBlock(blockNumber: number, api: ApiPromise, provider: ethers.providers.JsonRpcProvider): Promise<BscPrimitivesBscHeader> {
		let block = null;
		while (block == null) {
			console.log("Get block: ", blockNumber);
			block = await provider.getBlock(blockNumber);
			if (block != null) {
				
				const result: BscPrimitivesBscHeader = 
						api.createType("BscPrimitivesBscHeader", [
							api.createType("H256", block.parentHash),
							api.createType("H256", block.uncleHash),
							api.createType("Address", block.coinbase),
							api.createType("H256", block.stateRoot),
							api.createType("H256", block.transactionsRoot),
							api.createType("H256", block.receiptsRoot),
							api.createType("H2048", block.logBloom),
							api.createType("U256", block.difficulty),
							api.createType("u64", block.number),
							api.createType("U256", block.gasLimit.toString()),
							api.createType("U256", block.gasUsed.toString()),
							api.createType("u64", block.timestamp),
							api.createType("Bytes", block.extraData),
							api.createType("H256", block.mixDigest),
							api.createType("Bytes", block.nonce),
						]);
				return result;
			}
		}
	}
}
