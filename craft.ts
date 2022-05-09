import yargs from "https://deno.land/x/yargs@v17.4.1-deno/deno.ts";
import { GenerateCommand } from './src/cmd/mod.ts';

yargs(Deno.args)
    .command(GenerateCommand)
    .strictCommands()
    .demandCommand(1)
    .example('$0 -A craft.ts <command> <options>')
    .help('help')
    .version('0.0.1')
    .parse();