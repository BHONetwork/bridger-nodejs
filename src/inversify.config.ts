import { Container } from 'inversify';
import {
	BholdusBscTask,
	BholdusBscTaskBus,
	BholdusHeaderWriterService,
	BscHeaderListenerService,
} from '@tasks/task-bholdus-bsc';

const container = new Container();

container.bind<BholdusBscTask>(BholdusBscTask.symbol).to(BholdusBscTask);
container
	.bind<BholdusBscTaskBus>(BholdusBscTaskBus.symbol)
	.to(BholdusBscTaskBus);
container
	.bind<BholdusHeaderWriterService>(BholdusHeaderWriterService.symbol)
	.to(BholdusHeaderWriterService);
container
	.bind<BscHeaderListenerService>(BscHeaderListenerService.symbol)
	.to(BscHeaderListenerService);

export { container };
