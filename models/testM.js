module.exports = { 
 						identity:'dani', 
 						connection: 'mysqlDB',   
 						schema:true,              
 						migrate:'alter',
 						attributes: {"name":"string","password":"string","age":"string","sex":"string"}   
 					};