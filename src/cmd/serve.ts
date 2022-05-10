// deno-lint-ignore-file
import { Arguments } from 'https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts';

const serveCommandModule = {
	command: 'serve',
	describe: 'run as a daemon',
	builder: (yargs: any) => {
		return yargs.option('config', {
			alias: 'c',
			describe: 'config file path',
		}).example([
			['wc serve -c config.json', 'using a config file'],
			[
				'wc servet',
				'do not use a config file',
			],
		]);
	},
	handler: async (argv: Arguments) => {
	},
};

export { serveCommandModule };
