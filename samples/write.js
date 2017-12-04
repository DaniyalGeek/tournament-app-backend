var fs = require('fs');
var d=10;
var text="var withOrmCtrl=function (){ \
			var get=function (req,res){ \
						db('crud').find(function (err, data){  \
							if(err){  \
								res.status(500).send(err); \
							}else{  \
								res.json(data); \
							} \
						}); \
					}; \
			var post=function (req,res){ \
						db('crud').create(req.body).exec(function(err){ \
							if(err){ \
								res.status(500).send(err); \
							}else{ \
								res.status(201).send('user has been created'); \
							} \
						});	 \
					}; \
			var getOne=  function (req,res){ \
							db('crud').findOne({id: req.params.id}).exec(function(err,data){ \
								if(err){ \
									res.status(500).send(err); \
								}else{ \
									res.json(data); \
								} \
							}); \
						}; \
			var put=function (req,res){ \
						db('crud').update({id:req.params.id},req.body).exec(function (err, data){ \
							if(err){ \
								res.status(500).send(err); \
							}else{ \
								db('crud').findOne({id:req.params.id}).exec(function(err,data){ \
									if(err){ \
										res.status(500).send(err); \
									}else{ \
										res.json(data) \
									} \
								}); \
							} \
						}); \
					}; \
			var del=function (req,res){ \
							db('crud').destroy({id:req.params.id}).exec(function (err){ \
								if(err){ \
									res.status(500).send(err); \
								}else{ \
									res.send('User with id: '+req.params.id+' has been deleted'); \
								} \
							}); \
						}; \
			return { \
				get: 	get, \
				post: 	post, \
				getOne: getOne, \
				put: 	put, \
				delete: del \
			} \
		} \
		module.exports=withOrmCtrl; \
	";
fs.writeFile("./tmp/test.js", text, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 