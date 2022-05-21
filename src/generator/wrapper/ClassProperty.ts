// deno-lint-ignore-file
import AbstractWrapper from './AbstractWrapper.ts';
/** */
export default class ClassProperty extends AbstractWrapper {
	access: string = 'private';
	name: string = '';
	type: string = 'string';
	value = '';

	constructor(data: any) {
		super(data);
		this.access = data.access;
		this.name = data.name;
		this.type = data.type;
		this.value = data.format;
	}
	process(): void {
		throw new Error('Method not implemented.');
	}
}
