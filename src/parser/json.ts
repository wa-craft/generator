// deno-lint-ignore-file no-explicit-any
/**
 * json parser
 * @param data 
 */
const jsonParser = (data: any) => {
    console.log('json parser, with ' + (data.swagger ?? data.openapi ?? 'error'));
};

export { jsonParser };