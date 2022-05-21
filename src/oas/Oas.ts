// deno-lint-ignore-file
import {
	copy,
	emptyDirSync,
	ensureFileSync,
} from 'https://deno.land/std@0.139.0/fs/mod.ts';

import { Info, Path, Server, Tag } from './path/mod.ts';
import { IGenerator } from '../IGenerator.ts';
import { dirExists, fileExists } from '../util/file.ts';

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
		console.info(`[generate:mkdir]: ${target}`);

		//import plugin handlers and generate codes
		['frontend', 'backend', 'commandline', 'operation', 'schema'].forEach(
			async (configKey: string) => {
				let configValue = this.config[configKey] ?? '';
				let paths = configValue.split(',');
				paths.forEach(async (path: string) => {
					if (path === '') return;

					let pluginPath = `${source}/${configKey}/${path}`;
					let handlerFile = `./${pluginPath}/handler/mod.ts`;
					let resourcePath = `${pluginPath}/resource`;
					const handlerIds: Array<string> = ['Generator'];

					/*
					 set target path.
					 if configKey equals 'operation' or 'schema',
					 use the last path as the output target path.
					*/
					let targetPath;
					if (configKey === 'operation' || configKey === 'schema') {
						//seperated child path
						const spath = path.split('/');
						targetPath = `${target}/${configKey}/${spath[1]}`;
					} else {
						targetPath = `${target}/${configKey}`;
					}

					if (path !== '' && path !== undefined) {
						//copy resource files
						emptyDirSync(targetPath);
						if (await dirExists(resourcePath)) {
							copy(
								resourcePath,
								targetPath,
								{ overwrite: true },
							);
							console.info(
								`[generate:copy]: from {${resourcePath}} to {${targetPath}}`,
							);
						} else {
							console.warn(
								`[WARNING]: ${resourcePath} is not exists!`,
							);
						}

						//run handlers
						if (await fileExists(handlerFile)) {
							import('../../' + handlerFile).then((Plugin) => {
								//iterate all of the plugin handlers and run generate functions
								for (const handlerId of Object.keys(Plugin)) {
									if (handlerIds.indexOf(handlerId) >= 0) {
										let handler = new Plugin[handlerId](
											this.data,
										);
										handler?.execute();
									}
								}
							});
						} else {
							console.warn(
								`[WARNING]: ${handlerFile} is not exists!`,
							);
						}
					}
				});
			},
		);
	}
}

export { Oas };
