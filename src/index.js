const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

//Initializations
const app = express();
require('./database.js'); //connecting with Database

//Setting
app.set('port',process.env.PORT|3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname:'.hbs'
}));//settings motor layout for HTML files.Direction folders and files.
app.set('view engine','.hbs');//settings motor layout for HTML files.

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));//Incoming messages in body HTML MESSAGE.
app.use(express.json());

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use('/api/products',require('./routes/product'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is listenning
app.listen(app.get('port'),() => {
  console.log('Server on port',app.get('port'));
});
