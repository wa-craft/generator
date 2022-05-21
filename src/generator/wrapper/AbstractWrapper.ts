export default abstract class AbstractWrapper {
	protected name!: string;
	protected title!: string;

	constructor(data: any) {
		this.name = data.name ?? '';
		this.title = data.title ?? '';
	}
}
