import { Info, Path, Server, Tag } from './path/mod.ts';

/** */
class Oas {
	openapi: string = '';
	info!: Info;
	servers: Server[] = [];
	tags: Tag[] = [];
	paths: Path[] = [];

	constructor(data:any) {
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
	};

	/**
	 * print the class in console
	 */
	dump(): void {
		console.info(this);
	}
}

export { Oas };
