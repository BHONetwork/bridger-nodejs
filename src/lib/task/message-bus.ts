import { SubjectLike } from 'rxjs';

export interface IMessageStatic<Bus> extends Type<IMessage<Bus>> {
	channel(): SubjectLike<IMessage<Bus>>;
	symbol: symbol;
}

export interface IMessage<Bus> {}

export abstract class IMessageBus {
	private _channels: Map<symbol, SubjectLike<IMessage<IMessageBus>>>;

	channel<
		MessageBus extends IMessageBus,
		Message extends IMessage<MessageBus>,
		MessageStatic extends IMessageStatic<MessageBus>,
	>(constructor: MessageStatic): SubjectLike<Message> {
		if (this._channels.has(constructor.symbol)) {
			return this._channels.get(constructor.symbol);
		}
		const channel = constructor.channel();
		this._channels.set(constructor.symbol, channel);

		return channel;
	}
}
