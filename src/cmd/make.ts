// deno-lint-ignore-file
import { Arguments } from 'https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts';

const makeCommandModule = {
	command: 'make',
	describe: 'make seperated type codes',
	builder: (yargs: any) => {
		return yargs.option('type <type>', {
			alias: 't',
			describe:
				'make a class file by <type>, type will be one of: controller|model|view|event|middleware|router|validator|helper',
		}).example([
			[
				'make -c app.admin.controller.Index',
				'make a Index controller in @app/admin/controller',
			],
		]);
	},
	handler: async (argv: Arguments) => {
		if (argv.type !== undefined) {
			switch (argv.type) {
				case 'controller':
					break;
				case 'model':
					break;
				case 'view':
					break;
				case 'event':
					break;
				case 'middleware':
					break;
				case 'router':
					break;
				case 'validator':
					break;
				case 'helper':
					break;
			}
		}
	},
};

export { makeCommandModule };
