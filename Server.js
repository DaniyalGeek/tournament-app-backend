var express		=require('express');
var fileUpload = require('express-fileupload');
var jwt = require('jsonwebtoken');
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
app.set('superSecret', "superSecret"); // secret variable

app.use('/organization',require('./routers/organizationR.js'));
app.use('/user',require('./routers/userR.js'));

app.post('/authenticate', function(req, res) {
		  // find the user
		console.log(req.body)
		 db('user').findOne({
		    email: req.body.email
		  }, function(err, user) {
		  	console.log(user)
		    if (err) throw err;

		    if (!user) {
		      res.json({ success: false, message: 'Authentication failed. User not found.' });
		    } else if (user) {

		      // check if password matches
		      if (user.password != req.body.password) {
		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		      } else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign({email:user.email,password:user.password}, app.get('superSecret'), {
		         
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }   

		    }

		  });
		});

		app.use(function(req, res, next) {

		  // check header or url parameters or post parameters for token
		  var token = req.body.token || req.query.token || req.headers['x-access-token'];

		  // decode token
		  if (token) {

		    // verifies secret and checks exp
		    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;   
		  
		        next();
		      }
		    });

		  } else {

		    // if there is no token
		    // return an error
		    return res.status(403).send({ 
		        success: false, 
		        message: 'No token provided.' 
		    });
		    
		  }
		});


app.use('/api',require('./routers/testR.js'));

app.use('/email-checker',require('./routers/emailCheckerR.js'));
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

