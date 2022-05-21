import { IHandler } from "../../../../../src/IHandler.ts";

export default class After implements IHandler{
	execute(): any {
		console.log('After');
	}
};
