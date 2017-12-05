var express		=require('express');
var fileUpload = require('express-fileupload');

var app			=express();
var path 		=require('path');
var bodyParser	=require('body-parser');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// default options
app.use(fileUpload());
//App Configurations
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api',require('./routers/testR.js'));
app.use('/organization',require('./routers/organizationR.js'));
app.use('/user',require('./routers/userR.js'));
//ORM Configurations
var waterlineConfig = require('./waterline/config')
, waterlineOrm = require('./waterline/init').waterlineOrm;
var modelPath = path.join(__dirname, '/models');
require('./waterline/init')(modelPath);
//ORM Initialization 
waterlineOrm.initialize(waterlineConfig, function (err, models) {
if (err) throw err;
db = function (table) { return models['collections'][table]; };
db.collections = models.collections;
db.connections = models.connections;

});
//abc

app.listen(3000);

