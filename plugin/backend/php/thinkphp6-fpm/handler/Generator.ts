import { IExecutor } from '../../../../../src/IExecutor.ts';
class Generator implements IExecutor {
	data: any = {};

	constructor(data: any) {
		this.data = data;
	}

	execute(): void {
		//read data file
		/*
		const schemas = this.data.components.schemas
		for (const schemaKey of Object.keys(schemas)) {
			console.log(schemas[schemaKey].properties??'');
		}
		*/
		this.dump();

	}

	dump(): void {
		console.info('Generator handler');
	}
}

export default Generator;