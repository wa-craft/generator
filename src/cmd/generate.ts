// deno-lint-ignore-file
import { Arguments } from 'https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts';
import { fileExists, loadJsonObjectFromFile } from '../util/mod.ts';
import * as parser from '../parser/mod.ts';

const generateCommandModule = {
	command: 'generate',
	describe: 'generate codes',
	builder: (yargs: any) => {
		return yargs.option('config', {
			alias: 'c',
			describe: 'config file path',
		}).option('data', {
			alias: 'd',
			describe: 'data file path',
		}).option('target', {
			alias: 't',
			describe: 'target path',
		}).option('frontend <frontend-framework|none>', {
			alias: 'f',
			describe: 'frontend framework',
		}).option('backend <backend-framework|none>', {
			alias: 'b',
			describe: 'backend framework',
		}).example([
			['wc generate -c config.json', 'using a config file'],
			[
				'wc generate -d sample.json -f react-antd-umi -b thinkphp6-fpm -t ./output',
				'do not use a config file',
			],
		]);
	},
	handler: async (argv: Arguments) => {
		let config = {
			data: '',
			target: '',
			frontend: '',
			backend: '',
		};

		//set config params
		if (
			argv.config !== undefined && argv.config !== '' &&
			argv.config !== true
		) {
			//set params
			config = await loadJsonObjectFromFile(argv.config ?? 'config.json');
		} else {
			//set config params with default values
			if (argv.config === false) {
				config.data = argv.data ?? 'example/test.yaml';
				config.target = argv.target ?? './output';
				config.frontend = argv.frontend ?? 'react-antd-umi';
				config.backend = argv.backend ?? 'deno-oak';
			} else {
				console.log('Please input a config file name');
				return;
			}
		}

		//read data
		const data = await loadJsonObjectFromFile(
			config.data ?? 'example/test.yaml',
		);

		if (await data === false) {
			console.error('Load data failed!');
			return;
		}

		parser.parse(data);
	},
};

export { generateCommandModule };
