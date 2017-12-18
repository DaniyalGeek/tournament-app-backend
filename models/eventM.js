 module.exports = { 
 						identity:'event', 
 						connection: 'mysqlDB',   
 						schema:true,              
 						migrate:'alter',
 						attributes: {
			 					"title":"string",
			 					"startDate":"string",
			 					"endDate":"string",
			 					"location":"string",
			 					"image":"string",
			 					"description":"string",
			 					"image":"string",
			 					"event_type":"string",
			 					"fees":"string",
						         organization: {
									      model: 'organization'
									    }
                        }   
 					};

