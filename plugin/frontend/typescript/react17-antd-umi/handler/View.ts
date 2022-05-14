import { IGenerator } from '../../../../../src/IGenerator.ts';
class View implements IGenerator {
	data: any = {};

	constructor(data: any) {
		this.data = data;
	}

	generate(): void {
		console.log(this.data)
	}

	dump(): void {
		console.info('view handler');
	}
}

export default View;