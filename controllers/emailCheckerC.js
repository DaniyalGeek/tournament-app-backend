var dani =function (){ 

 					var getOne=  function (req,res){ 
 									db('user').findOne({email: req.params.id}).exec(function(err,data){ 
 										if(err){ 
 											res.status(500).send(err); 
 										}else{ 
 											if(data)
 												res.json({success:true,message:"Email exist"});  
 											else
 												res.json({success:false,message:"Email not exist"});  

 										}  
 									});  
 								};  

 					return {  
 						
 						getOne: getOne,  
 					 
 					}  
 				}  
 				module.exports=dani;  
 			