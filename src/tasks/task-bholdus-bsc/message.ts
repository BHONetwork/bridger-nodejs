import { IMessageStatic, IMessage } from '@lib/task';
import { staticImplements } from '@lib/static-implements';
import { Subject, SubjectLike } from 'rxjs';
import { BholdusBscTaskBus } from './bus';

@staticImplements<IMessageStatic<BholdusBscTaskBus>>()
export class BholdusWriterMessage implements IMessage<BholdusBscTaskBus> {
	static symbol = Symbol(BholdusWriterMessage.name);
	static channel(): SubjectLike<BholdusWriterMessage> {
		return new Subject();
	}
}
