// deno-lint-ignore-file no-explicit-any
import * as OasType from '../oas/path/mod.ts';
import { Oas } from '../oas/Oas.ts';
/**
 * yaml parser
 * @param data
 */
const parse = (data: any) => {
	let oas = new Oas();

	oas.load(data);
	oas.echo();
};

export { parse };
