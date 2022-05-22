export default abstract class AbstractWrapper {
	name!: string;
	title!: string;

	constructor(data: any) {
		this.name = data.name ?? '';
		this.title = data.title ?? '';
	}

	abstract process(): void;
}
