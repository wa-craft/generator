import { IExecutor } from '../../../../../src/IExecutor.ts';
class View implements IExecutor {
	data: any = {};

	constructor(data: any) {
		this.data = data;
	}

	execute(): void {
		//console.log(this.data)
		this.dump();
	}

	dump(): void {
		console.info('view handler');
	}
}

export default View;