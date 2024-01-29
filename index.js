const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const Db = require('./Database/mongoose');
const routes = require('./modules/index');
const morgan = require('morgan');

const app = express();
Db.mongooseConnectDB();


app.use(require('cors')());
app.use(require('helmet')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

const commonErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') console.error(err);
}

app.use(commonErrorHandler);
app.use(morgan('dev'));

app.listen(PORT, () => console.log(`*** Magic happes on port ${PORT} ***`));
