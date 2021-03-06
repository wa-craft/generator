import yargs from "https://deno.land/x/yargs@v17.4.1-deno/deno.ts";
import * as cmd from './src/cmd/mod.ts';

yargs(Deno.args)
    .command(cmd.genCommandModule)
    .command(cmd.makeCommandModule)
    .command(cmd.serveCommandModule)
    .strictCommands()
    .demandCommand(1)
    .example('$0 -A craft.ts <command> <options>')
    .version('0.0.2')
    .parse();