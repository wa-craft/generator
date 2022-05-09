// deno-lint-ignore-file no-explicit-any
async function fileExists(filePath: string):Promise<boolean> {
    try {
        const stat = await Deno.lstat(filePath);
        if(!stat.isFile) {
            console.log('File not exists!');
            return false;
        }
    } catch (_error: any) {
        return false;
    }

    return true;
}
export { fileExists };