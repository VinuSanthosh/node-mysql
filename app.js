const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const dontenv = require('dotenv');
const routes = require('./server/routes/student');
const app = express();
dontenv.config();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//include static files
app.use(express.static('public'));

//Template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//Router
app.use('', routes);

app.listen(port,()=>{
console.log('Server listing:'+ port);
});