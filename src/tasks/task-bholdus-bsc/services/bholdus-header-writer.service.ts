import { inject, injectable } from 'inversify';
import { IService } from '@lib/task';
import { BholdusBscTaskBus } from '../bus';
import { ApiPromise } from '@polkadot/api';
import getApiOptions from '@bholdus/api-options';

@injectable()
export class BholdusHeaderWriterService implements IService<BholdusBscTaskBus> {
	static symbol = Symbol(BholdusHeaderWriterService.name);
	@inject(BholdusBscTaskBus.symbol) private bus: BholdusBscTaskBus;
	constructor() {}

	async start(): Promise<void> {
		const api = await ApiPromise.create(getApiOptions());
	
	}
}
