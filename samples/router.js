var express		=require('express');
var app			=express();
var crudRouter	=express.Router();
var withOrmCtrl=require('../controllers/withOrmCtrl')();

crudRouter.route('/')
	.get(withOrmCtrl.get)
	.post(withOrmCtrl.post);
crudRouter.route('/:id')
	.get(withOrmCtrl.getOne)
	.put(withOrmCtrl.put)
	.delete(withOrmCtrl.delete);

module.exports=crudRouter;