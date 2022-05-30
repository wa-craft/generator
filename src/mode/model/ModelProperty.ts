// deno-lint-ignore-file
import Property from '../schema/Property.ts';
/** */
export default class ModelProperty extends Property {
	errorMessage: string = '';
	regexp: string = '';
	constructor(data: any) {
        super(data);
		this.errorMessage = data.errorMessage;
		this.regexp = data.regexp;
	}
}
