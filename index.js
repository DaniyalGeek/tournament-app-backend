var express		=require('express');
var fileUpload = require('express-fileupload');
var jwt = require('jsonwebtoken');
var app			=express();
var path 		=require('path');
 var node_acl = require( 'acl' );
var bodyParser	=require('body-parser');
var mongoose= require('mongoose');
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

 app.use(express.static(path.join(__dirname, 'public')));




// Error handling
app.use( function( error, request, response, next ) {
    if( ! error ) {
        return next();
    }
    response.json( error.msg, error.errorCode );
});

// Connecting to mongo database and setup authorization
mongoose.connect( 'mongodb://127.0.0.1:27017/tournament' );

    var mongoBackend = new node_acl.mongodbBackend( mongoose.connection.db /*, {String} prefix */ );
    acl = new node_acl( mongoBackend );

    // Defining roles and routes
    set_roles();
    set_routes();


// This creates a set of roles which have permissions on
//  different resources.
function set_roles() {

    // Define roles, resources and permissions
    acl.allow([
        {
            roles: '0',    //super -admin
            allows: [
                { resources: '/secret', permissions: '*' }
            ]
        }, {
            roles: '1',   //organization-admin
            allows: [
                { resources: '/secret', permissions: 'get' },
                 { resources: '/user', permissions: 'get' }
            ]
        }, {
            roles: '2',  //partipent
            allows: [
            {resources:'/secret' , permissions:'get'}
            ]
        }
    ]);

   acl.addRoleParents( 'user', 'guest' );
   acl.addRoleParents( 'admin', 'user' );
}

// Defining routes ( resources )
function set_routes() {

    // Check your current user and roles
    app.get( '/status/:id', function( request, response ) {
        acl.userRoles(  request.params.id || false, function( error, roles ){
          response.json( {'User':  request.user ,"Roles":  roles  });
        });
    });

    // Only for users and higher
    app.all( '/secret', [  acl.middleware( 1, get_user_id) ],function( request, response ) {

            response.send( 'Welcome Sir!' +request.params.id);
        }
    );
	app.use('/user',require('./routers/userR.js'));
    //accept error
    app.use(acl.middleware.errorHandler('json')); 
    
}

// This gets the ID from currently logged in user
function get_user_id( request, response ) {
        

    return request.headers['x-access-token'];
}

app.use('/organization',require('./routers/organizationR.js'));
app.use('/login',require('./routers/loginR.js'));

// app.post('/authenticate', function(req, res) {
// 		  // find the user
// 		console.log(req.body)
// 		 db('user').findOne({
// 		    email: req.body.email
// 		  }, function(err, user) {
// 		  	console.log(user)
// 		    if (err) throw err;

// 		    if (!user) {
// 		      res.json({ success: false, message: 'Authentication failed. User not found.' });
// 		    } else if (user) {

// 		      // check if password matches
// 		      if (user.password != req.body.password) {
// 		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
// 		      } else {

// 		        // if user is found and password is right
// 		        // create a token
// 		        var token = jwt.sign({email:user.email,password:user.password}, app.get('superSecret'), {
		         
// 		        });

// 		        // return the information including token as JSON
// 		        res.json({
// 		          success: true,
// 		          message: 'Enjoy your token!',
// 		          token: token
// 		        });
// 		      }   

// 		    }

// 		  });
// 		});

		// app.use(function(req, res, next) {

		//   // check header or url parameters or post parameters for token
		//   var token = req.body.token || req.query.token || req.headers['x-access-token'];

		//   // decode token
		//   if (token) {

		//     // verifies secret and checks exp
		//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
		//       if (err) {
		//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
		//       } else {
		//         // if everything is good, save to request for use in other routes
		//         req.decoded = decoded;   
		  
		//         next();
		//       }
		//     });

		//   } else {

		//     // if there is no token
		//     // return an error
		//     return res.status(403).send({ 
		//         success: false, 
		//         message: 'No token provided.' 
		//     });
		    
		//   }
		// });


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

