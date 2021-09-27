/**
 * Module with web related utilities, need to be able to run in the browser, so no fs stuff etc.
 */

export async function loadExampleClick() {
	const pslTextResponse: Response = await fetch('./example');
	_getPslTextArea().value = await pslTextResponse.text();
}

export async function parsePslClick() {
	// TODO: psl-parser has fs stuff, so even webpack etc. won't solve our problems without
	// removing that. Therefore, just a fetch again.
	const pslParsedJson: Response = await fetch('./parse',
		{method: 'POST', body: _getPslTextArea().value});
	_getPslParsedText().innerHTML = await pslParsedJson.text();
}

function _getPslTextArea(): HTMLTextAreaElement {
	return (<HTMLTextAreaElement>document.getElementById('pslInput'));
}

function _getPslParsedText(): HTMLParagraphElement {
	return (<HTMLParagraphElement>document.getElementById('parserOutput'));
}

function _getExampleButton(): HTMLButtonElement {
	return (<HTMLButtonElement>document.getElementById('loadExample'));
}

function _getParseButton(): HTMLButtonElement {
	return (<HTMLButtonElement>document.getElementById('parseCode'));
}
