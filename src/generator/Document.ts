import AbstractGenerator from './AbstractGenerator.ts';

/** */
export default class Document extends AbstractGenerator {
	constructor(data: any) {
		super();
		this.data = data;
	}

	generate(): void {
	}
}
