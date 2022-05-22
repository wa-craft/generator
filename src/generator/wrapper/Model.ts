// deno-lint-ignore-file
import AbstractClass from './AbstractClass.ts';
import ClassProperty from './ClassProperty.ts';

/** */
export default class Model extends AbstractClass {
	properties: Array<ClassProperty> = [];
	config: any = {};
	uses: Array<string> = [];

	constructor(data: any) {
		super(data);
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
					this.properties.push(new ClassProperty(property));
				}
			}
		}
	}

	setNamespace(): void {
		throw new Error('Method not implemented.');
	}

	process(): void {
		throw new Error('Method not implemented.');
	}

	getJson(): any {
		return {
			namespace: this.namespace,
			isAbstract: false,
			className: this.name,
			implenments: this.implenments,
			properties: this.properties,
		};
	}
}
