import { Container } from 'inversify';
import {
	BholdusBscTask,
	BholdusBscTaskBus,
	BholdusHeaderWriterService,
	BscHeaderListenerService,
} from '@tasks/task-bholdus-bsc';
import { TYPES } from '@constant';
import { BholdusApiProvider } from '@lib/api';
import { ApiPromise } from '@polkadot/api';
import getApiOptions from '@bholdus/api-options';

const container = new Container();

container
	.bind<BholdusBscTask>(BholdusBscTask.symbol)
	.to(BholdusBscTask)
	.inSingletonScope();
container
	.bind<BholdusBscTaskBus>(BholdusBscTaskBus.symbol)
	.to(BholdusBscTaskBus)
	.inSingletonScope();
container
	.bind<BholdusHeaderWriterService>(BholdusHeaderWriterService.symbol)
	.to(BholdusHeaderWriterService)
	.inSingletonScope();
container
	.bind<BscHeaderListenerService>(BscHeaderListenerService.symbol)
	.to(BscHeaderListenerService)
	.inSingletonScope();
container
	.bind<BholdusApiProvider>(TYPES.BholdusApi)
	.toProvider<ApiPromise>(() => {
		let api: ApiPromise;
		return async () => {
			if (api) {
				return api;
			}
			api = await ApiPromise.create(getApiOptions());
			return api;
		};
	});

export { container };
