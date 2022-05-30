import { Tag } from './Tag.ts';
import { Parameter } from './Parameter.ts';
import { HttpResponse } from './HttpResponse.ts';

interface HttpMethod {
	name: string;
	summary: string;
	operationId: string;
	tags: Tag[];
	parameters: Parameter[];
	response: HttpResponse[];
}

export type { HttpMethod };
