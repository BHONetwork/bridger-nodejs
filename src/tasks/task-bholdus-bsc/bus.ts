import { injectable } from 'inversify';
import { IMessageBus } from '@lib/task';

@injectable()
export class BholdusBscTaskBus extends IMessageBus {
	static symbol = Symbol(BholdusBscTaskBus.name);
}
