require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require("./routers/user.router")

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', usersRouter);

//server
app.listen(port, () => console.log(`Listening on port ${port}`));
