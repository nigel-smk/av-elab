//TODO set a binary server route
//TODO use routes instead of controllers

//what do bower and toastr do?

var express = require('express'),
    fs = require('fs'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    moment = require('moment'),
    async = require('async'),
    request = require('request'),
    path = require('path'),
    drive = require('./app/services/googleDrive'),
    http = require('http');
var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV;
console.log(env);

//express configuration
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.locals.basedir = __dirname;
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true}));
//what are we setting here?
app.use(stylus.middleware(
	{
		src: __dirname + "/public",
		compile: function(str, path){
            return stylus(str).set('filename', path);
        }
	}
));

//mongo setup
mongoose.connect(require('./credentials/mLab.json').URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('petersonLab db opened');
});
//initialize the models
var appData = require('./app/models/appData');
var session = require('./app/models/session');
var share = require('./app/models/share');
var study = require('./app/models/study');
var activity = require('./app/models/activity');

//static route handling
app.use(express.static(__dirname + "/public"));
//dynamically add routes from controllers folder
(function requireRoutes(routePath){
    fs.readdirSync(routePath).forEach(function (file) {
        if (file.substr(-3) == '.js') {
            console.log(path.join(routePath, file));
            route = require('./' + path.join(routePath, file));
            route.controller(app);
        //recursive
        } else if (fs.lstatSync(path.join(routePath, file)).isDirectory()) {
            requireRoutes(path.join(routePath, file));
        }
    });
})('./app/controllers');
//admin page route
app.get('/admin', function(req, res){
    res.render('admin', {
    });
});
//else, serve index.html
app.get('/', function(req, res){
	res.render('index', {
    });
});

//initialize gDrive folder structure
console.log("Initializing gDrive folder structure...");
drive.init();
drive.mkdir(["eLab"], null, function(err){
    if(err) {
        console.error(err);
        return;
    }
});

//add binary-server token validation middleware
app.use("/api/upload", function(req, res, next){
    var request = req;
    var response = res;
    next();
});
//start server
const port = process.env.PORT || 3030;
var server = http.createServer(app).listen(port);
require('./app/binary-server/binary-server.js')(server, "/api/upload");
console.log("Listening on port " + port + "...");
