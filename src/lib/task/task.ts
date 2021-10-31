export interface ITask {
	name: string;
	start(): Promise<void>;
}
