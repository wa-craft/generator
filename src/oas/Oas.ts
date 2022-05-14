import { Info, Path, Server, Tag } from './path/mod.ts';
import { IGenerator } from '../IGenerator.ts';

import { copy, emptyDir } from 'https://deno.land/std@0.139.0/fs/mod.ts';

/** */
class Oas implements IGenerator {
	openapi: string = '';
	info!: Info;
	servers: Server[] = [];
	tags: Tag[] = [];
	paths: Path[] = [];
	config: any = {};

	constructor(data: any, config: any) {
		data.config = config;
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
		//create target directories
		const source = './plugin';
		const target = this.config.target ?? './output';
		emptyDir(target);
		console.info(`[generate:dir]: ${target}`);

		//create frontend template & copy resource files
		if (this.config.frontend !== undefined && this.config.frontend !== '') {
			copy(
				`${source}/frontend/typescript/${this.config.frontend}/resource`,
				`${target}/frontend`,
				{ overwrite: true },
			);
			console.info(`[generate:copy]: ${target}/${this.config.frontend}`);
		}

		//create backend template & copy resource files
		if (this.config.backend !== undefined && this.config.backend !== '') {
			copy(
				`${source}/backend/php/${this.config.backend}/resource`,
				`${target}/backend`,
				{ overwrite: true },
			);
			console.info(`[generate:copy]: ${target}/${this.config.backend}`);
		}
	}
}

export { Oas };
