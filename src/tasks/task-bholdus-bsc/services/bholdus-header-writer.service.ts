import { inject, injectable } from 'inversify';
import { IService } from '@lib/task';
import { BholdusBscTaskBus } from '../bus';
import { ApiPromise, WsProvider} from '@polkadot/api';
import getApiOptions from '@bholdus/api-options';
import {BholdusWriterMessage} from '../message'
import { BscPrimitivesBscHeader } from '@bholdus/types/interfaces/bscPrimitives';


@injectable()
export class BholdusHeaderWriterService implements IService<BholdusBscTaskBus> {
	static symbol = Symbol(BholdusHeaderWriterService.name);
	@inject(BholdusBscTaskBus.symbol) private bus: BholdusBscTaskBus;
	constructor() {}

	async start(): Promise<void> {
		// const api = await ApiPromise.create(getApiOptions());
		const wsProvider = new WsProvider('ws://127.0.0.1:9944');
		const api = await ApiPromise.create({ provider: wsProvider });

		// Do something
		this.bus.channel(BholdusWriterMessage).subscribe({next:(message: BscPrimitivesBscHeader[]) =>{
			let req = api.tx.bsc.verifyAndUpdateAuthoritySetSigned(message)
			console.log("Result writer: ", req)
			console.log("Message headerbsc: ", message)
		}})
	}
}
