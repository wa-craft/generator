// deno-lint-ignore-file no-explicit-any
import { Oas } from '../oas/Oas.ts';
/**
 * yaml parser
 * @param data
 */
function parse(data: any) {
	let oas = new Oas(data);
	const craft = oas.toCraft();
	craft.generate();
	//oas.dump();
}

export { parse };
