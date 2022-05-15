import {
	copy,
	emptyDirSync,
	ensureFileSync,
} from 'https://deno.land/std@0.139.0/fs/mod.ts';

import { Info, Path, Server, Tag } from './path/mod.ts';
import { IGenerator } from '../IGenerator.ts';
import { fileExists } from '../util/file.ts';

/** */
class Oas implements IGenerator {
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

	/**
	 * turn oas object to craft object
	 */
	generate(): void {
		//create target directories
		const source = 'plugin';
		const target = this.config.target ?? './output';
		emptyDirSync(target);
		console.info(`[generate:dir]: ${target}`);

		//create frontend template & copy resource files
		if (this.config.frontend !== undefined && this.config.frontend !== '') {
			emptyDirSync(`${target}/frontend`);
			copy(
				`${source}/frontend/${this.config.frontend}/resource`,
				`${target}/frontend`,
				{ overwrite: true },
			);
			console.info(`[generate:copy]: ${target}/${this.config.frontend}`);
		}

		//create backend template & copy resource files
		if (this.config.backend !== undefined && this.config.backend !== '') {
			emptyDirSync(`${target}/backend`);
			copy(
				`${source}/backend/${this.config.backend}/resource`,
				`${target}/backend`,
				{ overwrite: true },
			);
			console.info(`[generate:copy]: ${target}/${this.config.backend}`);
		}

		//import plugin handlers and generate codes
		['frontend', 'backend', 'commandline'].forEach(async (element) => {
			let fw = this.config[element] ?? '';
			let pluginPath;

			pluginPath = `./${source}/${element}/${fw}/handler/mod.ts`;
			if (fw !== '' && fw !== undefined) {
				console.log(pluginPath);
				if (await fileExists(pluginPath)) {
					import('../../' + pluginPath).then((Plugin) => {
						//iterate all of the plugin handlers and run generate functions
						for (const id of Object.keys(Plugin)) {
							let handler = new Plugin[id](this.data);
							handler?.generate();
						}
					});
				} else {
					console.error(`Plugin path [${pluginPath}] is not exists!`);
				}
			}
		});
	}
}

export { Oas };
