import AbstractClass from './AbstractClass.ts';

/** */
export default class Router extends AbstractClass {
	routes: Array<any> = [];

	process(): void {
		throw new Error('Method not implemented.');
	}
	setNamespace(): void {
		throw new Error('Method not implemented.');
	}
}
