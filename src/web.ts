/**
 * Module with web related utilities, need to be able to run in the browser, so no fs stuff etc.
 */
import * as jsonview from './jsonview';

let pslInput: HTMLTextAreaElement = null;
let parsedOutput: HTMLParagraphElement = null;
let parsedInfo: HTMLParagraphElement = null;
let parseCodeButton: HTMLButtonElement
let loadExampleButton: HTMLButtonElement = null;
// TODO: Implement
// let loadFileButton: HTMLButtonElement = null;

async function loadExampleClick() {
	const pslTextResponse: Response = await fetch("/example");
	pslInput.value = await pslTextResponse.text();
}

async function parsePslClick() {
	if (!pslInput || pslInput.value.length === 0) {
		parsedOutput.innerHTML = "{}";
		return;
	}
	// TODO: psl-parser has fs stuff, so even webpack etc. won't solve our problems without
	// removing that. Therefore, just a fetch again.
	// TODO: Fetch is using application/json wrapper, because of the body-parser. Would be nice
	// to just use raw code as bytes though.
	const pslParsedJson: Response = await fetch("/parse",
		{
			method: "POST",
			body: JSON.stringify({'pslText': pslInput.value}),
			headers: {"Content-Type": "application/json"},
		});
	jsonview.renderJSON((await pslParsedJson.text()), parsedOutput);
	// parsedOutput.innerHTML = .replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
}

function onWindowLoadFunc() {
	pslInput = <HTMLTextAreaElement>document.getElementById("pslInput");
	parsedOutput = <HTMLParagraphElement>document.getElementById("parsedOutput");
	parsedInfo = <HTMLParagraphElement>document.getElementById("parserInfo");
	parseCodeButton = <HTMLButtonElement>document.getElementById("parseCode");
	loadExampleButton = <HTMLButtonElement>document.getElementById("loadExample");

	loadExampleButton.addEventListener("click", loadExampleClick);
	parseCodeButton.addEventListener("click", parsePslClick);

	// TODO: Should we parse immediately? One way of getting the initial {}, but also if things
	// are still loaded, would then update / init properly
	// parsePslClick();

	// TODO: could add an 'input' event listener on pslInput
}

window.onload =  onWindowLoadFunc;
