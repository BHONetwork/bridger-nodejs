import { IMessageStatic, IMessage } from '@lib/task';
import { staticImplements } from '@lib/static-implements';
import { Subject, SubjectLike } from 'rxjs';
import { BholdusBscTaskBus } from './bus';

@staticImplements<IMessageStatic<BholdusBscTaskBus>>()
export class BholdusWriterSubmitBscHeaderMessage implements IMessage<BholdusBscTaskBus> {
	static symbol = Symbol(BholdusWriterSubmitBscHeaderMessage.name);
	static channel(): SubjectLike<BholdusWriterSubmitBscHeaderMessage> {
		return new Subject();
	}
}
