// deno-lint-ignore-file
import Property from '../schema/Property.ts';
/** */
export default class ModelProperty extends Property {
	regexp: string = '';
	errorMessage: string = '';
	constructor(data: any) {
        super(data);
		this.errorMessage = data.tableName;
		this.regexp = data.regexp;
	}
}
