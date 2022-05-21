import AbstractWrapper from './AbstractWrapper.ts';

/** */
export default class Application extends AbstractWrapper {
	portal: string = 'index';
	prefix: string = 'api/index';

	process(): void {
		throw new Error('Method not implemented.');
	}
}
