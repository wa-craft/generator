class Craft {
	config: any = {};
	data: any = {};

	constructor(data: any, config: any) {
		this.config = config;
		this.data = data;
	}

	/**
	 * generate codes
	 */
	generate() {
	}

	dump(): void {
		console.info('craft');
	}
}

export { Craft };
