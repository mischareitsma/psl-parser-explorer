import * as express from 'express';
import * as path from 'path';

const app: express.Application = express();
const port: String = process.env.EXPRESS_PORT || '3000';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req: express.Request, res: express.Response) => {
	res.render('index', {title: 'PSL Tokenizer, Parser and Linter Test'});
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
});
