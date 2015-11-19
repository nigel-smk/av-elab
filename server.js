//what do bower and toastr do?

var express = require('express'),
    fs = require('fs'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    moment = require('moment'),
    json2csv = require('json2csv'),
    archiver = require('archiver'),
    async = require('async'),
    request = require('request'),
    path = require('path'),
    drive = require('./app/services/googleDrive');
var app = express();

//set your environment variable? what does this effect?
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developmen';
console.log(env);

//express configuration
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.locals.basedir = __dirname;
app.set('jwtTokenSecret', 'PETERSON_LAB');
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
app.use(multer({ dest: './tmp/' }).single('file'));
//static route handling
app.use(express.static(__dirname + "/public"));

//mongo setup
if (env === 'development') {
    mongoose.connect('mongodb://localhost/petersonLab');
} else {
    mongoose.connect('mongodb://nigelsmk:simplepassword@ds041154.mongolab.com:41154/heroku_p0n7ngq3');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('petersonLab db opened');
});

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

//angular partials route
app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

//admin page route
app.get('/admin', function(req, res){
    res.render('admin', {
    });
});

app.get('/run/:studyId', function(req, res){
    res.render('index', {
    })
})

//else, serve index.html
app.get('*', function(req, res){
	res.render('index', {
    });
});

//initialize gDrive folder structure
console.log("Initializing folder structure...");
drive.mkDir({path: ["eLab", "Stimuli"]}, function(err) {
    if (err) {
        console.error(err);
    } else {
        drive.mkDir({path: ["eLab", "avData"]}, function (err) {
            if (err) {
                console.error(err);
            } else {
                drive.mkDir({path: ["eLab", "sessionData"]}, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
});

const port = process.env.PORT || 3030;
app.listen(port);
console.log("Listening on port " + port + "...");
