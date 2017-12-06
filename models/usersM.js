

 					module.exports = { 
 						identity:'user', 
 						connection: 'mysqlDB',   
 						schema:true,              
 						migrate:'alter',
 						attributes: {
 						"email": "string",
 						"password": "string",
 						"name":"string",
 						"contact_phone":"string",
 						"image":"string",
 						"profile": {
 							model:'organization'
 						}
 					}
 				}