// deno-lint-ignore-file
import AbstractWrapper from './AbstractWrapper.ts';
import ClassMethodParameter from './ClassMethodParameter.ts';

/** */
export default class ClassMethod extends AbstractWrapper {
	access: string = 'private';
	type: string = 'string';
	isStatic: boolean = false;
	parameters: Array<ClassMethodParameter> = [];

	constructor(data: any) {
		super(data);
		this.access = data.access;
		this.name = data.name;
		this.type = data.type;
	}
}
