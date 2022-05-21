// deno-lint-ignore-file
import { renderFile } from 'https://deno.land/x/mustache@v0.3.0/mod.ts';

import AbstractWrapper from './AbstractWrapper.ts';
import { ClassProperty } from './ClassProperty.ts';
import { normalize } from 'https://deno.land/std@0.139.0/path/mod.ts';

/** */
class Model implements AbstractWrapper {
	properties: any = [];
	config: any = {};
	namespace: string = '';
	uses: Array<string> = [];
	is_abstract: boolean = false;
	name: string = '';
	implenments: Array<string> = [];

	constructor(data: any) {
		if (data.properties !== undefined) {
			for (const properId of Object.keys(data.properties)) {
				if (data.properties[properId] !== undefined) {
					let p = data.properties[properId];
					//process type
					let type;
					type = p.type ?? 'string';
					type = (type === 'integer') ? 'int' : type;
					const property = {
						access: 'private',
						name: `$${properId}`,
						type: type,
						format: p.format ?? 'vachart(50)',
						description: p.description ?? properId,
						default: p.default ?? '',
						example: p.example ?? '',
						enum: p.enum ?? [],
					};
					this.properties.push(property);
				}
			}
		}
	}

	getJson(): any {
		return {
			namespace: this.namespace,
			is_abstract: false,
			className: this.name,
			implenments: this.implenments,
			properties: this.properties,
		};
	}
}

export { Model };
