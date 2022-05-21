import AbstractWrapper from './AbstractWrapper.ts';
export default abstract class AbstractClass extends AbstractWrapper {
	protected namespace!: string;
	protected access!: string;
	protected isAbstract!: boolean;
	constructor(data: any) {
		super(data);
		this.namespace = data.namespace ?? '';
		this.access = data.access ?? '';
		this.isAbstract = data.isAbstract ?? false;
	}
}
