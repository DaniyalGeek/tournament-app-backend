module.exports = { 
 						identity:'organization', 
 						connection: 'mysqlDB',   
 						schema:true,              
 						migrate:'alter',
 						attributes: {
			 					"org_name":"string",
			 					"org_street":"string",
			 					"org_state":"string",
			 					"org_zip":"string",
			 					"org_country":"string",
			 					"org_phone":"string",
			 					"org_logo":"string",
			 					 admin:{
						           collection:'user',
						           via:'organization'
						        }
                        }   
 					};

