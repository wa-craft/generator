// deno-lint-ignore-file
import { IMode } from './IMode.ts';
export default class Database implements IMode {
    load(data: any): void {
        throw new Error("Method not implemented.");
    }
};