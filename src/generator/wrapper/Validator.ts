import AbstractClass from './AbstractClass.ts';
import ClassProperty from './ClassProperty.ts';

import Dictionary from '../../craft.d.ts';
/** */
export default class Validator extends AbstractClass {
	properties!: Array<ClassProperty>;
	rules!: Dictionary;
	messages!: Dictionary;

	constructor(data: any) {
		super(data);
		this.properties = data.properties ?? [];
		this.rules.push(['hello', 'world']);
	}

	process(): void {
		throw new Error('Method not implemented.');
	}
	setNamespace(): void {
		throw new Error('Method not implemented.');
	}
}
