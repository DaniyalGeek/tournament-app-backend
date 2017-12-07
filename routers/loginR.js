	var express		=require('express'); 
 			var app			=express();    
 			var crudR		=express.Router(); 
 			var crudC		=require('./../controllers/loginC.js')();

 		crudR.route('/')
 				.post(crudC.getOne)

 		module.exports=crudR;