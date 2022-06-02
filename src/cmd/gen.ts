// deno-lint-ignore-file
import { Arguments } from 'https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts';
import { fileExists, loadJsonObjectFromFile } from '../util/mod.ts';
import { Openapi } from '../parser/mod.ts';
import * as generator from '../generator/mod.ts';
import { Config, ConfigSchema } from '../Config.ts';

const genCommandModule = {
	command: 'gen',
	describe: 'gen codes',
	builder: (yargs: any) => {
		return yargs.option('config', {
			alias: 'c',
			describe: 'config file path',
		}).option('type', {
			alias: 't',
			describe:
				'generate type <all|backend|frontend|commandline|operation|schema|document>',
		}).example([
			['wc gen -c config.json', 'using a config file'],
			[
				'wc gen -t backend',
				'use a default config file and specified a module to generate',
			],
		]);
	},
	handler: async (argv: Arguments) => {
		let config: Config;
		//set config params
		let configFile = '';
		if (
			argv.config !== undefined && argv.config !== '' &&
			argv.config !== true
		) {
			//try to find a config file from the example path
			configFile = (await fileExists(argv.config))
				? argv.config
				: ((await fileExists('./example/cms.json'))
					? './example/cms.json'
					: (await fileExists('./example/cms.yaml')
						? './example/cms.yaml'
						: ''));
		} else {
			//set config params with default values
			if (argv.config === false || argv.config === undefined) {
				configFile = (await fileExists('./example/cms.json'))
					? './example/cms.json'
					: (await fileExists('./example/cms.yaml')
						? './example/cms.yaml'
						: '');
			} else {
				console.log('[ERROR]: Please input a config file name');
				return;
			}
		}

		if (configFile === '') {
			console.log('Please input a config');
			return;
		}

		config = await loadJsonObjectFromFile(configFile);

		//set config type, override the type value in the config file
		let configType = 'all';
		if (argv.type === true) {
			console.log('[ERROR]: Please input a generator type!');
			return;
		}

		configType = argv.type ?? 'all';
		config.type = configType;

		//read data
		const data = await loadJsonObjectFromFile(
			config.data ?? './example/cms-admin.yaml',
		);

		if (await data === false) {
			console.error('Load data failed!');
			return;
		}

		/**
		 * use generator process openapi data
		 */
		let op: Openapi = new Openapi(data, config);
		switch (configType) {
			case 'backend':
				(new generator.Backend(op)).generate();
				break;
			case 'frontend':
				(new generator.Frontend(op)).generate();
				break;
			case 'commandline':
				(new generator.Commandline(op)).generate();
				break;
			case 'operation':
				(new generator.Operation(op)).generate();
				break;
			case 'schema':
				(new generator.Schema(op)).generate();
				break;
			case 'document':
				(new generator.Document(op)).generate();
				break;
			case 'all':
			default:
				(new generator.Backend(op)).generate();
				(new generator.Frontend(op)).generate();
				(new generator.Commandline(op)).generate();
				(new generator.Operation(op)).generate();
				(new generator.Schema(op)).generate();
				(new generator.Document(op)).generate();
		}
	},
};

export { genCommandModule };
