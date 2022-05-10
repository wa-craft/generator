import { HttpSchema } from './HttpSchema.ts';

interface Parameter {
	name: string;
	in: string;
	description: string;
	required: boolean;
	schema: HttpSchema;
}

export type { Parameter };
