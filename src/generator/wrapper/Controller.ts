import AbstractClass from './AbstractClass.ts';
import ClassMethod from './ClassMethod.ts';

/** */
export default class Controller extends AbstractClass {
	methods: Array<ClassMethod> = [];

	constructor(data: any) {
		super(data);
		this.methods = data.methods;
	}

	process(): void {
		throw new Error('Method not implemented.');
	}
	setNamespace(): void {
		throw new Error('Method not implemented.');
	}
	getJson(): void {
	}
}
