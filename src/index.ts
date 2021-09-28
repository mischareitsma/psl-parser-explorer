import * as express from 'express';
import * as path from 'path';

import { getExample, parsePsl } from './utils';

const app: express.Application = express();
const port: String = process.env.EXPRESS_PORT || '3000';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Scripts that are imported are in the root
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
	res.render('index', {title: 'PSL Tokenizer, Parser and Linter Test'});
});

app.get('/example', (req: express.Request, res: express.Response) => {
	res.send(getExample());
});

app.post('/parse', (req: express.Request, res: express.Response) => {
	const parsedText: string = parsePsl(req.body.pslText)
	// console.log(parsedText);
	res.send(parsedText);
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
});
