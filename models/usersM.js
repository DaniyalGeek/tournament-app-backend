

 					module.exports = { 
 						identity:'user', 
 						connection: 'mysqlDB',   
 						schema:true,              
 						migrate:'alter',
 						attributes: {
 						"email":"string",
 						"password":"string",
 						"profile":{
 							model:'organization'
 						}
 					}
 				}