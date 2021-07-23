import * as express from 'express';

const app: express.Application = express();
const port: String = process.env.EXPRESS_PORT || '3000';

app.get('/', (req: express.Request, res: express.Response) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
});
