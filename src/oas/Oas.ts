import { Info, Path, Server, Tag } from './path/mod.ts';
import { IGenerator } from '../IGenerator.ts';

/** */
class Oas implements IGenerator {
	openapi: string = '';
	info!: Info;
	servers: Server[] = [];
	tags: Tag[] = [];
	paths: Path[] = [];
	config: any = {};

	constructor(data: any, config: any) {
		this.config = config;
		this.load(data);
	}

	/**
	 * init the object by load from data
	 * @param data
	 */
	load(data: any): void {
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

	/**
	 * turn oas object to craft object
	 */
	generate(): void {
	}
}

export { Oas };
