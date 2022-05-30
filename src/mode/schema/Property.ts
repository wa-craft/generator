// deno-lint-ignore-file
/** */
export default class Property {
	name: string = '';
	type: string = 'string';
	format = 'vachart(50)';
	description = '';
	default: string = '';
	example: string = '';
	enum: Array<string> = [];

	constructor(data: any) {
		this.name = data.name;
		this.type = data.type;
		this.format = data.format;
		this.description = data.description;
		this.default = data.default;
		this.example = data.example;
		this.enum = data.enum;
	}
}
