// deno-lint-ignore-file
import { Info, Path, Server, Tag } from './path/mod.ts';

/** */
class Openapi {
	openapi: string = '';
	info!: Info;
	servers: Server[] = [];
	tags: Tag[] = [];
	paths: Path[] = [];
	schemas: any = [];
	config: any = {};
	data: any = {};

	constructor(data: any, config: any) {
		data.config = config;
		this.data = data;
		this.load(data);
	}

	/**
	 * init the object by load from data
	 * @param data
	 */
	load(data: any): void {
		this.config = data.config ?? {};

		//openapi
		this.openapi = data?.openapi;

		//info
		this.info = data?.info;

		//servers
		data?.servers.forEach((server: Server) => {
			this.servers.push(server);
		});

		//tags
		data?.tags.forEach((tag: Tag) => {
			this.tags.push(tag);
		});

		//schemas
		for (const schema of Object.keys(data?.components?.schemas)) {
			this.schemas.push(data?.components?.schemas[schema]);
		}

		//paths
		for (const path of Object.keys(data?.paths)) {
			this.paths.push(data?.paths[path]);
		}

		this.config = data?.config;
	}

	/**
	 * print the class in console
	 */
	dump(): void {
		console.info(this);
	}
}

export { Openapi };
