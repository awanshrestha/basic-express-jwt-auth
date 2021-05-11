const express = require("express");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const path = require('path')
require('dotenv').config();
const errorHandlers = require("./handlers/errorHandler");
const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use('/api', apiRouter)
app.use('/', indexRouter)

if (process.env.NODE_ENV === "development") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}
app.use( (req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

module.exports = app;
