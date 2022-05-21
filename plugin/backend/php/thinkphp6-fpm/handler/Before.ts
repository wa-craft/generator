import { IHandler } from "../../../../../src/IHandler.ts";

export default class Before implements IHandler{
	execute(): any {
		console.log('Before');
	}
};
