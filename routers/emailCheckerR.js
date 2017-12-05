	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/emailCheckerC.js')();

 			crudR.route('/:id')
 				.get(crudC.getOne)
 
 		module.exports=crudR;