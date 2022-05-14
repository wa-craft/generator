/**
 * a singleton config object
 */
class Config {
	data: any = {};
	private static _instance: Config;

	private constructor() {
	}

	static getInstance(): Config {
		return this._instance ?? new this();
	}

	init(data: any): void {
		this.data = data;
	}
}

export { Config };
