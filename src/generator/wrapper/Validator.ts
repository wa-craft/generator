import AbstractClass from './AbstractClass.ts';
import ClassProperty from './ClassProperty.ts';

/** */
export default class Validator extends AbstractClass {
	properties!: Array<ClassProperty>;

	constructor(data: any) {
		super(data);
		this.properties = data.properties ?? [];
	}

	process(): void {
		throw new Error('Method not implemented.');
	}
	setNamespace(): void {
		throw new Error('Method not implemented.');
	}
}
