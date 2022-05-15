// deno-lint-ignore-file no-explicit-any

import { readYaml } from 'https://deno.land/x/garn_yaml@0.2.1/mod.ts';
import { parse } from 'https://deno.land/std@0.139.0/path/mod.ts';

async function fileExists(filePath: string): Promise<boolean> {
	try {
		const stat = await Deno.lstat(filePath);
		if (!stat.isFile) {
			return false;
		}
	} catch (_error: any) {
		return false;
	}

	return true;
}

async function dirExists(filePath: string): Promise<boolean> {
	try {
		const stat = await Deno.lstat(filePath);
		if (!stat.isDirectory) {
			return false;
		}
	} catch (_error: any) {
		return false;
	}

	return true;
}

/**
 * load data file from filePath, and turn to a Json object.
 * Support *.yaml|*.yml|*.json file types
 * @param filePath
 * @returns
 */
async function loadJsonObjectFromFile(filePath: string): Promise<any> {
	if (!await fileExists(filePath)) return false;
	let data;

	try {
		//yaml or json
		const parsedPath = parse(filePath);
		const extension = parsedPath.ext;

		if (extension === '.json') {
			const dataContent = await Deno.readTextFile(filePath);
			if (dataContent === '') {
				console.error('[ERROR]: read data file failed!');
				return false;
			}

			data = JSON.parse(dataContent);
		} else if (extension === '.yaml' || extension === '.yml') {
			const yamlObject = await readYaml(filePath);
			if (typeof yamlObject !== 'object') {
				console.error('read data file failed!');
				return false;
			}
			data = yamlObject;
		} else {
			console.error('[ERROR]: data file must in json or yaml format!');
			return false;
		}
	} catch (_error: any) {
		return false;
	}

	return data;
}

export { dirExists, fileExists, loadJsonObjectFromFile };
