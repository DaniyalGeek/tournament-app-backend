var express		=require('express');


app			=express();
var path 		=require('path');
var bodyParser	=require('body-parser');
//App Configurations
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
Routing
require('./router.js');
app.use('/api',require('./routers/testR.js'));
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
	app.get('/gep',function(req,res){
		res.send("hello");
	})
//	module.exports = app;
app.listen(3000);

