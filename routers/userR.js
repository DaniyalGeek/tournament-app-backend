	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/userC.js')();
 			crudR.route('/')
 				.get(crudC.get)
 				.post(crudC.post);
 			crudR.route('/:id') 				
 				.put(crudC.put)
 				.delete(crudC.delete) 
		crudR.route('/login')
 				.post(crudC.getOne)
 		module.exports=crudR;