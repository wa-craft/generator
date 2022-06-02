// deno-lint-ignore-file
import Property from './Property.ts';

/** */
export default class Schema {
	properties: Array<Property> = [];

	constructor(data: any) {
        this.properties = data.properties ?? [];
	}
}
