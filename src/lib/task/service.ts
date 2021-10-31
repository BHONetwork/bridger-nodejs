import { IMessageBus } from './internal';

export interface IService<MessageBus extends IMessageBus> {
	start(bus: MessageBus): Promise<void>;
}
