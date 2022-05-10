// deno-lint-ignore-file
import { Arguments } from "https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts";

const makeCommandModule = {
    command: 'make',
    describe: 'make seperated type codes',
    builder: (yargs: any) => {
        return yargs.option('type',{
            alias: 't',
            describe: 'make a class file by <type>'
        }).example([
                ['make -c app.admin.controller.Index', 'make a Index controller in @app/admin/controller']
            ]);
    },
    handler: async (argv: Arguments) => {
    }
};

export { makeCommandModule };