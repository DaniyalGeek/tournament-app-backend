var user =function (){ 

 
 					var getOne=  function (req,res){ 
 									console.log(req.body)
											 db('user').findOne({email: req.body.email}).populate("profile").exec( function(err, user) {
											  	console.log(user)
											    if (err) throw err;

											    if (!user) {
											      res.json({ success: false, message: 'Authentication failed. User not found.' });
											    } else if (user) {

											      // check if password matches
											      if (user.password != req.body.password) {
											        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
											      } else {

											        // return the information including token as JSON
											        res.json({
											          success: true,
											        	data:user				
											        });
											      }   

											    }

											  }); 
 								};  

  
 					return {  
  
 						getOne: 	getOne,  
 
 					}  
 				}  
 				module.exports=user;  
 			