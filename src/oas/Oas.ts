import { Info, Path, Server, Tag } from './path/mod.ts';

/** */
class Oas {
	openapi!: string;
	info!: Info;
	servers!: Server[];
	tags!: Tag[];
	paths!: Path[];
}

export { Oas };
