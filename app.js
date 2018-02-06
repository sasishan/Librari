var config = require('./config')
	, http = require('http')
	, express = require('express')
	, expressSession = require('express-session')
	, monk = require('monk')
	, bodyParser = require('body-parser')
  	, cookieParser = require('cookie-parser')
  	//Route Files
  	, items = require('./routes/items')
  	, libraries = require('./routes/libraries')
  	;

var uri = config.dbURI;
var db = monk(uri);

var app = express();

app.set('port', process.env.PORT || config.PORT);
app.set('views', __dirname + '/views');
app.set('routes', __dirname + '/routes');

app.use (function(req, res, next) 
{
	//console.log('test')
	req.db = db; 
	next(); 

});

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//set up passport
app.use(expressSession({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: false }}));  //set to true for SSL

// ROUTES
app.get('/api/me/libraries', libraries.get);  //get list of libraries
app.get('/api/me/libraries/:libId/items', libraries.getItems);  //get one specific library including all properties and contents
app.post('/api/me/libraries/new', libraries.create);  //create a new library
app.post('/api/me/libraries/:libId/items/new', libraries.addItem); //add an item to the library

//app.get('/api/me/items/:itemId', libraries.getItem);  //get one specific item
//app.delete('/api/me/items/:itemId', libraries.deleteItem)
app.get('/api/global/itemconfig', items.getGlobalItemsConfig)
app.get('/api/me/itemconfig', items.getMyItemsConfig)

//app.post('/api/me/library/:libId/item', libraries.createItem);
//app.patch('/api/me/library', libraries.update);

app.get('/api/me/item/:itemId', items.get);


http.createServer(app).listen(app.get('port'), function()
{
	console.log('Librari listening on port ' + app.get('port'));
});