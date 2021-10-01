/*
exports.collapseChildren = collapseChildren;
exports.createTree = createTree;
exports.expandChildren = expandChildren;
exports.render = render;
exports.renderJSON = renderJSON;
exports.traverseTree = traverseTree;
*/

export interface Node {
	key: string;
	parent?: Node;
	value: any; // TODO: any or number | string | object | node?
	isExpanded: boolean;
	type: string // TODO: Strings??
	children?: Node[];
	el?: string; // TODO: what is this?
	depth: number; // What is this? How many parents it has?
}

export function traverseTree(node: Node, callback: (node: Node) => void): void;
export function createTree(jsonData: string): Node;
export function renderJSON(jsonData: string, targetElement: HTMLElement): Node;
export function render(rootNode: Node, targetElement: HTMLElement): void;
export function expandChildren(node: Node): void;
export function collapseChildren(node: Node): void;
