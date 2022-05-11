// deno-lint-ignore-file
import { Arguments } from 'https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts';
import { readYaml } from 'https://deno.land/x/garn_yaml@0.2.1/mod.ts';
import { fileExists } from '../util/mod.ts';
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
			if (!await fileExists(argv.config)) {
				console.log('Ensure config file exists');
				return;
			}

			const configContent = await Deno.readTextFile(argv.config);

			if (configContent === '') {
				console.log('read config file failed!');
				return;
			}

			config = JSON.parse(configContent);
		} else {
			//set config params with default values
			if (argv.config === false) {
				config.data = argv.data ?? 'sample/sample.json';
				config.target = argv.target ?? './output';
				config.frontend = argv.frontend ?? 'react-antd-umi';
				config.backend = argv.backend ?? 'deno-oak';
			} else {
				console.log('Please input a config file name');
				return;
			}
		}

		//read data
		if (!await fileExists(config.data)) {
			console.error('Ensure data file exists');
			return;
		}
		//yaml or json
		const dataFileNameArray = config.data.split('.');
		const extension = dataFileNameArray[dataFileNameArray.length - 1];
		let data;

		if (extension === 'json') {
			const dataContent = await Deno.readTextFile(config.data);
			if (dataContent === '') {
				console.error('read data file failed!');
				return;
			}

			data = JSON.parse(dataContent);
		} else if (extension === 'yaml' || extension === 'yml') {
			const yamlObject = await readYaml(config.data);
			if (typeof yamlObject !== 'object') {
				console.error('read data file failed!');
				return;
			}
			data = yamlObject;
		} else {
			console.error('data file must in json or yaml format!');
			return;
		}

		//

		data.config = config;
		
		parser.parse(data);
	},
};

export { generateCommandModule };
