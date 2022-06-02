// deno-lint-ignore-file
import { IParser } from './IParser.ts';
export default class Database implements IParser {
    load(data: any): void {
        throw new Error("Method not implemented.");
    }
};