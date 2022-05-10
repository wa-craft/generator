// deno-lint-ignore-file
import { Arguments } from "https://deno.land/x/yargs@v17.4.1-deno/deno-types.ts";

const serveCommandModule = {
    command: 'generate',
    describe: 'generate codes',
    builder: (yargs: any) => {
        return yargs.option('config',{
                alias: 'c',
                describe: 'config file path'
            }).example([
                ['generate -c config.json', 'using a config file'],
                ['generate -d sample.json -f react-antd-umi -b thinkphp6-fpm -t ./output', 'do not use a config file']
            ]);
    },
    handler: async (argv: Arguments) => {
    }
};

export { serveCommandModule };