const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');// libreria para manejar y optimizar las Promise de React 
//[NO ME SIRVE para Java, capaz si me sirva para cuando sea en React Native]
var cors = require('cors');
var indexRouter = require('./routes/index');
const fs = require('fs');
const http = require('http');
const https = require('https');
/*
const options = {
    pfx: fs.readFileSync('ssl/pfxfile.pfx'),
    passphrase: 'password'
};
*/
// Setting express
const app = express();


app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());// le dice que va a manejar JSON
app.use(bodyParser.json());
app.use(cookieParser());// Parseo de Cookies
// Setting up the welcome message
app.use(cors());
//require('./routes')(app);
app.use(express.urlencoded({// le dice que va a manejar URLencode
	extended: false
  }));
  


app.use('/', indexRouter);
//app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => res.status(200).send({
	message: 'Bienvenidos, estás en la Web Services de Cook',
}));

app.use(function (req, res, next) {
	next(createError(404));
  });
  
  app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
  });
  
  // error handler
  app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'Development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
  });
  

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log("HTTP listening on port "+ port));

//const httpsServer = https.createServer(options, app);
//const portHttps = process.env.PORT || 8443;
//httpsServer.listen(portHttps, () => console.log("HTTPS listening on port "+ portHttps))

module.exports = app;