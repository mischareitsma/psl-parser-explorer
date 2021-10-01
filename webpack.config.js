const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'out', 'web.js'),
	output: {
		path: path.join(__dirname, 'out'),
		filename: 'web.bundle.js'
	},
	mode: 'production',
	optimization: {
		minimize: false
	}
}
