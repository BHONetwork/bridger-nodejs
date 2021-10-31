import { SubjectLike } from 'rxjs';

export interface IMessage<EventBus> {}

export interface IChannel<Message> {
	subject: SubjectLike<Message>;
}

export interface IChannelConstructor<Message> {
	new (): IChannel<Message>;
	symbol: Symbol;
}

export interface IMessageBus {
	tx<
		MessageBus extends IMessageBus,
		Message extends IMessage<MessageBus>,
		ChannelConstructor extends IChannelConstructor<Message>,
		Channel extends IChannel<Message>,
	>(
		constructor: ChannelConstructor,
	): Channel;
}
