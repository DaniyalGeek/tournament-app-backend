module.exports = { 
 						identity:'organization', 
 						connection: 'mysqlDB',   
 						schema:true,              
 						migrate:'alter',
 						attributes: {
			 					"org_name":"string",
			 					"org_address":"string",
			 					"org_phone":"string",
			 					"org_email":{type:"string",unique:true},
			 					"org_contact_name":"string",
			 					"org_contact_phone":"string",
			 					"org_contact_email":"string",
			 					"org_logo":"string"
                        }   
 					};

