import { Info, Path, Server, Tag } from './path/mod.ts';

/** */
class Oas {
	openapi: string = '';
	info!: Info;
	servers: Server[] = [];
	tags: Tag[] = [];
	paths: Path[] = [];

	load = (data: any): any => {
		this.info = data?.info;
		data?.servers.forEach((server: Server) => {
			this.servers.push(server);
		});

		data?.tags.forEach((tag: Tag) => {
			this.tags.push(tag);
		});

		for (const path of Object.keys(data?.paths)) {
			this.paths.push(data?.paths[path]);
		}
	};

	echo(): void {
		console.log(this);
	}
}

export { Oas };
