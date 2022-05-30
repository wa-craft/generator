// deno-lint-ignore-file
import { IMode } from './IMode.ts';
export default class Model implements IMode {
    load(data: any): void {
        throw new Error("Method not implemented.");
    }
};