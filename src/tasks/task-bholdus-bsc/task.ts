import { inject, injectable } from 'inversify';
import { ITask } from '@lib/task';
import { BholdusBscTaskBus } from './bus';
import { BholdusHeaderWriterService } from './services/bholdus-header-writer.service';
import { BscHeaderListenerService } from './services/bsc-header-listener.service';

@injectable()
export class BholdusBscTask implements ITask {
	static symbol = Symbol(BholdusBscTask.name);
	name = 'task-bholdus-bsc';
	@inject(BholdusBscTaskBus.symbol)
	private bus: BholdusBscTaskBus;
	@inject(BholdusHeaderWriterService.symbol)
	private bholdusHeaderWriterService: BholdusHeaderWriterService;
	@inject(BscHeaderListenerService.symbol)
	private bscHeaderListenerService: BscHeaderListenerService;

	async start() {
		this.bscHeaderListenerService.start();
		this.bholdusHeaderWriterService.start();
	}
}
