/* Parser related utilities. This file contains all the functions etc.
require to make the parser work on the web page.
*/
import * as fs from 'fs';
import * as path from 'path';
import * as pslParser from 'psl-parser';

let examplePsl: string = '';

function _loadExample() {
	if (examplePsl !== '') return;

	examplePsl = fs.readFileSync(path.join('static', 'Example.psl')).toString('utf-8');
}

export function getExample(): string {
	if (examplePsl === '') _loadExample();

	return examplePsl;
}

export function parsePsl(psl: string): string {
	return JSON.stringify(pslParser.parseText(psl), null, 4);
}
