import AbstractClass from './AbstractClass.ts';
import ClassMethod from './ClassMethod.ts';
import ClassProperty from './ClassProperty.ts';

/** */
export default class View extends AbstractClass {
	layout!: string;
	methods!: Array<ClassMethod>;
	properties!: Array<ClassProperty>;

	constructor(data: any) {
		super(data);
		this.methods = data.methods ?? [];
		this.properties = data.properties ?? [];
	}
	process(): void {
		throw new Error('Method not implemented.');
	}
	setNamespace(): void {
		throw new Error('Method not implemented.');
	}
}
