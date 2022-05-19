// deno-lint-ignore-file
import { renderFile } from "https://deno.land/x/mustache@v0.3.0/mod.ts";

import { IGenerator } from './IGenerator.ts';
import { ClassProperty } from './ClassProperty.ts';
import { normalize } from "https://deno.land/std@0.139.0/path/mod.ts";

/** */
class Model implements IGenerator {
	properties:any = [];
	config:any = {};
	namespace:string = '';
	uses:Array<string> = [];
	is_abstract: boolean = false;
	name: string = '';
	implenments:Array<string> = [];

	constructor(data:any) {
		if(data.properties !== undefined) {
			for (const properId of Object.keys(data.properties)) {
				if(data.properties[properId] !== undefined) {
					let p = data.properties[properId];
					const property = new ClassProperty({
						access: 'private',
						name: properId,
						type: p.type?? 'string',
						format: p.format ?? 'vachart(50)',
						description: p.description ?? properId,
						default: p.default ?? '',
						example: p.example ?? '',
						enum: p.enum ?? []
					});
					this.properties.push(property);
				}
			}
		}
	}
	
	generate(): void {
		this.properties.forEach((property:ClassProperty) => {
			let targetFile = `${this.config.targetPath}/${property.name}.php`;
			//ensureFileSync(targetFile);
			//read template
			let text = renderFile(normalize(targetFile), property);
		});
	}

	getJson():any{
		return {
			namespace: this.namespace,
			is_abstract: false,
			className: this.name,
			implenments: this.implenments,
			properties: this.properties
		};
	}
}

export { Model };
