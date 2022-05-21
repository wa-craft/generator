export type ConfigSchema = {
	name: string;
	type: string;
	username: string;
	password: string;
	charset: string;
	host: string;
	port: string;
};

export type Config = {
	name: string;
	company: string;
	vendor: string;
	copyright: string;
	revision: string;
	type: string;
	namespace: string;
	target: string;
	backend: string;
	frontend: string;
	commandline: string;
	document: string;
	operation: string;
	schema: Array<ConfigSchema>;
	data: string;
};
