import * as express from 'express';
import * as path from 'path';

import { getExample, parsePsl } from './utils';

const app: express.Application = express();
const port: String = process.env.EXPRESS_PORT || '3000';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req: express.Request, res: express.Response) => {
	res.render('index', {title: 'PSL Tokenizer, Parser and Linter Test'});
});

app.get('/example', (req: express.Request, res: express.Response) => {
	res.send(getExample());
});

app.post('/parse', (req: express.Request, res: express.Response) => {
	res.send(parsePsl(req.body));
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
});
