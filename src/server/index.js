const express = require('express');
const morgan = require('morgan')

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.static('dist'));

app.get('/', (_, res) => res.sendFile(`${__dirname}/dist/index.html`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
