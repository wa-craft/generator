// deno-lint-ignore-file
import { renderFile } from "https://deno.land/x/mustache@v0.3.0/mod.ts";
import { ensureFileSync } from 'https://deno.land/std@0.139.0/fs/mod.ts';
import { normalize } from "https://deno.land/std@0.139.0/path/mod.ts";
abstract class AbstractGenerator {
    protected async writeFromTemplateFile(templateFilePath:string, filePath: string, model: any): Promise<void> {
        let text = await renderFile(normalize(templateFilePath), model);

        const encoder = new TextEncoder();
        ensureFileSync(filePath);
        console.info(`[generate:write]: ${filePath}`);
        Deno.writeFileSync(filePath, encoder.encode(text));
    }

    public execute(): void {

    }
}

export default AbstractGenerator;