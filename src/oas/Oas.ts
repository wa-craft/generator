import * as types from './path/mod.ts';

/** */
class Oas {
	openapi!: string;
	info!: types.Info;
	servers!: types.Server[];
	tags!: types.Tag[];
	paths!: types.Path[];
}

export { Oas };
