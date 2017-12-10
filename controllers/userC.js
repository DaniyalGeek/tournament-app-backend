var user =function (){ 
 					var get=function (req,res){ 
 								db('user').find().populate("profile").exec(function (err, data){  
 									if(err){  
 										res.status(500).send(err); 
 									}else{  
 										res.json(data); 
 									} 
 								}); 
 							}; 
 					var post=function (req,res){ 
 								db('user').create(req.body).exec(function(err,data){ 
 									if(err){ 
 										res.status(500).send(err); 
 									}else{ 
 									
 										res.status(201).send('user has been created'); 
 									} 
 								});	 
 							}; 
 					var getOne=  function (req,res){ 
 									db('user').findOne({email: req.body.email,password:req.body.password}).populate("profile").exec(function(err,data){ 
 										if(err){ 
 											res.status(500).send(err); 
 										}else{ 
 											if(data)
 												res.json(data);  
 											else
 												res.json({success:false,message:"User not exist"})
 										}  
 									});  
 								};  
 					var put=function (req,res){  
 						if(req.files){

 							let rcvd_c_Image = req.files.c_pic;
				            let file_c_Name = Math.random().toString(36).slice(2);
				            let c_destPath = "uploads/images/"+file_c_Name+".jpg";
				            rcvd_c_Image.mv("public/"+c_destPath, function(err) {
				            	 console.log("user image upload")
				                req.body.image = c_destPath
				                  db('user').update({id:req.params.id},req.body).exec(function (err, data){  
 									if(err){  
 										res.status(500).send(err);  
 									}else{  
 										db('user').findOne({id:req.params.id}).exec(function(err,data){  
 											if(err){  
 												res.status(500).send(err);  
 											}else{  
 												res.json(data)  
 											}  
 										});  
 									}  
 								});
				            })

 						}else{
 							  db('user').update({id:req.params.id},req.body).exec(function (err, data){  
 									if(err){  
 										res.status(500).send(err);  
 									}else{  
 										db('user').findOne({id:req.params.id}).exec(function(err,data){  
 											if(err){  
 												res.status(500).send(err);  
 											}else{  
 												res.json(data)  
 											}  
 										});  
 									}  
 								});
 						}
				 	
				              
				              

				         
 								  
 							};  
 					var del=function (req,res){  
 									db('user').destroy({id:req.params.id}).exec(function (err){  
 										if(err){  
 											res.status(500).send(err);  
 										}else{  
 											res.send('User with id: '+req.params.id+' has been deleted');  
 										}  
 									});  
 								};  
 					return {  
 						get: 	get,  
 						post: 	post,  
 						getOne: getOne,  
 						put: 	put,  
 						delete: del  
 					}  
 				}  
 				module.exports=user;  
 			