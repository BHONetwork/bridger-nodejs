import { inject, injectable } from 'inversify';
import { IService } from '@lib/task';
import { BholdusBscTaskBus } from '../bus';

@injectable()
export class BholdusHeaderWriterService implements IService<BholdusBscTaskBus> {
	static symbol = Symbol(BholdusHeaderWriterService.name);
	@inject(BholdusBscTaskBus.symbol) private bus: BholdusBscTaskBus;

	async start(): Promise<void> {}
}
