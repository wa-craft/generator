// deno-lint-ignore-file no-explicit-any
/**
 * yaml parser
 * @param data
 */
const parse = (data: any) => {
	for (const path of Object.keys(data.paths)) {
		console.log('path: ' + path + ', value: ' + data.paths[path]);
	}
	console.log(
		'yaml parser, with ' + (data.swagger ?? data.openapi ?? 'error'),
	);
};

export { parse };
