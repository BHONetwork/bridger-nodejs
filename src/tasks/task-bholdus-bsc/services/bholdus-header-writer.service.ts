import { inject, injectable } from 'inversify';
import { IService } from '@lib/task';
import { BholdusBscTaskBus } from '../bus';
import { ApiPromise, WsProvider, Keyring} from '@polkadot/api';
import getApiOptions from '@bholdus/api-options';
import {BholdusWriterSubmitBscHeaderMessage} from '../message'
import { BscPrimitivesBscHeader } from '@bholdus/types/interfaces/bscPrimitives';
import logger from '@lib/logger';
@injectable()
export class BholdusHeaderWriterService implements IService<BholdusBscTaskBus> {
	static symbol = Symbol(BholdusHeaderWriterService.name);
	@inject(BholdusBscTaskBus.symbol) private bus: BholdusBscTaskBus;
	constructor() {}

	async start(): Promise<void> {
		logger.info(BholdusHeaderWriterService.name);
		// const api = await ApiPromise.create(getApiOptions());
		const wsProvider = new WsProvider('ws://127.0.0.1:9944');
		const api = await ApiPromise.create({ provider: wsProvider });
		const keyring = new Keyring({ type: 'sr25519' });
		const alice = keyring.addFromUri('//Alice');

		// Do something
		this.bus.channel(BholdusWriterSubmitBscHeaderMessage).subscribe({next:(message: BscPrimitivesBscHeader[]) =>{
			let req = api.tx.bsc.verifyAndUpdateAuthoritySetSigned(message)
			req.signAndSend(alice, (resp) => {
				logger.info(BholdusHeaderWriterService.name + " - status: " + resp.status);

				if (resp.status.isInBlock) {
					logger.info(BholdusHeaderWriterService.name + ` - Transaction included at blockHash: ${resp.status.asInBlock}`);
				  } else if (resp.status.isFinalized) {
					logger.info(BholdusHeaderWriterService.name + ` - Transaction finalized at blockHash: ${resp.status.asFinalized}`);
				  }
			})
		}})
	}
}
