/**
 * Module with web related utilities, need to be able to run in the browser, so no fs stuff etc.
 */

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
	if (!pslInput) return "{}";
	if (pslInput.value.length === 0) return "{}";
	// TODO: psl-parser has fs stuff, so even webpack etc. won't solve our problems without
	// removing that. Therefore, just a fetch again.
	console.log(`Body for POST fetch: ${pslInput.value}`);
	const pslParsedJson: Response = await fetch("/parse",
		{method: "POST", body: pslInput.value});
	parsedOutput.innerHTML = (await pslParsedJson.text()).replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
}

function onWindowLoadFunc() {
	pslInput = <HTMLTextAreaElement>document.getElementById("pslInput");
	parsedOutput = <HTMLParagraphElement>document.getElementById("parsedOutput");
	parsedInfo = <HTMLParagraphElement>document.getElementById("parserInfo");
	parseCodeButton = <HTMLButtonElement>document.getElementById("parseCode");
	loadExampleButton = <HTMLButtonElement>document.getElementById("loadExample");

	loadExampleButton.addEventListener('click', loadExampleClick);
	parseCodeButton.addEventListener('click', parsePslClick);

	// TODO: Should we parse immediately? One way of getting the initial {}, but also if things
	// are still loaded, would then update / init properly
	parsePslClick();

	// TODO: could add an 'input' event listener on pslInput
}

window.onload =  onWindowLoadFunc;
