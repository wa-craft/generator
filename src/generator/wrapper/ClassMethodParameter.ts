// deno-lint-ignore-file
import AbstractWrapper from './AbstractWrapper.ts';
/** */
export default class ClassMethodParameter extends AbstractWrapper {
	type: string = 'string';
	value: string = '';

	constructor(data: any) {
		super(data);
		this.type = data.type;
		this.value = data.format;
	}

	process(): void {
		throw new Error('Method not implemented.');
	}
}
