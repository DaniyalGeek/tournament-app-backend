var organization =function (){ 
 					var get=function (req,res){ 
 								db('organization').find(function (err, data){  
 									if(err){  
 										res.status(500).send(err); 
 									}else{  
 										res.json(data); 
 									} 
 								}); 
 							}; 
 					var post=function (req,res){ 
           console.log(req.files);
             let rcvdImage = req.files.org_logo;
              let fileName = Math.random().toString(36).slice(2);
              let destPath = "uploads/images/"+fileName+".jpg";

              // Use the mv() method to place the file somewhere on your server
              rcvdImage.mv("public/"+destPath, function(err) {
                req.body.org_logo = destPath
                  		db('organization').create(req.body).exec(function(err,data){ 
                        if(err){ 
                          res.status(500).send(err); 
                        }else{ 
                          res.status(201).json(data); 
                        } 
                      });	
               
              })

 						 
 							}; 
 					var getOne=  function (req,res){ 
 									db('organization').findOne({id: req.params.id}).exec(function(err,data){ 
 										if(err){ 
 											res.status(500).send(err); 
 										}else{ 
 											res.json(data);  
 										}  
 									});  
 								};  
 					var put=function (req,res){  
 								db('organization').update({id:req.params.id},req.body).exec(function (err, data){  
 									if(err){  
 										res.status(500).send(err);  
 									}else{  
 										db('organization').findOne({id:req.params.id}).exec(function(err,data){  
 											if(err){  
 												res.status(500).send(err);  
 											}else{  
 												res.json(data)  
 											}  
 										});  
 									}  
 								});  
 							};  
 					var del=function (req,res){  
 									db('organization').destroy({id:req.params.id}).exec(function (err){  
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
 				module.exports=organization;  
 			