// deno-lint-ignore-file
import Schema from '../schema/Schema.ts';
/** */
export default class ModelSchema extends Schema {
	
	primaryKey: string = 'id';
	tableName: string = '';
	constructor(data: any) {
        super(data);
		this.primaryKey = data.primaryKey;
		this.tableName = data.primaryKey;
	}
}
