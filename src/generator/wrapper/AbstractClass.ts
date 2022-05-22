import AbstractWrapper from './AbstractWrapper.ts';
export default abstract class AbstractClass extends AbstractWrapper {
	namespace!: string;
	access!: string;
	isAbstract!: boolean;
	exnteds!: string;
	implenments: Array<string> = [];

	constructor(data: any) {
		super(data);
		this.namespace = data.namespace ?? '';
		this.access = data.access ?? '';
		this.isAbstract = data.isAbstract ?? false;
		this.exnteds = data.exnteds ?? '';
		this.implenments = data.implenments ?? [];
	}

	abstract setNamespace(): void;
}
