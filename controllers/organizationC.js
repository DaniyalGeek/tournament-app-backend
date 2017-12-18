var organization =function (){ 
          var get=function (req,res){ 
                db('organization').find().populate("admin").exec(function (err, data){  
                  if(err){  
                    res.status(500).send(err); 
                  }else{  
                    res.json(data); 
                  } 
                }); 
              }; 
          var post=function (req,res){ 
           console.log(req.files);
             let rcvdImage = req.files.org_logo;
              let fileName = Math.random().toString(36).slice(2);
              let destPath = "uploads/images/"+fileName+".jpg";

             let rcvd_c_Image = req.files.c_pic;
            let file_c_Name = Math.random().toString(36).slice(2);
            let c_destPath = "uploads/images/"+file_c_Name+".jpg";
            rcvd_c_Image.mv("public/"+c_destPath, function(err) {
                console.log("user image upload")

            })
              // Use the mv() method to place the file somewhere on your server
              rcvdImage.mv("public/"+destPath, function(err) {
                req.body.org_logo = destPath
                  db('user').findOne({email: req.body.c_email}).exec(function(err,data){ 
                    if(err){ 
                      res.status(500).send(err); 
                    }else{ 
                      if(data){
                        res.json({success:false,message:"email already exist"})
                      }
                      else{
                                req.body.org_cover= "uploads/images/cover.jpg"
                                db('organization').create(req.body).exec(function(err,data){ 
                                  if(err){ 
                                    res.status(500).send(err); 
                                  }else{ 
                                        
                                        db('user').create({image:c_destPath ,contact_phone:req.body.c_phone,name:req.body.c_name,email:req.body.c_email,password:req.body.password,profile:data.id,role:'1'}).exec(function(err,data){ 
                                          if(err){ 
                                            res.status(500).send(err); 
                                          }
                                           acl.addUserRoles( data.id , req.body.role );
                                        });  
                                    res.status(201).json(data); 
                                  } 
                                });

                      }
                      
                    }  
                  }); 
               
              })

             
              }; 
          var getOne=  function (req,res){ 
                  db('organization').findOne({id: req.params.id}).populate("admin").exec(function(err,data){ 
                    if(err){ 
                      res.status(500).send(err); 
                    }else{ 
                      res.json(data);  
                    }  
                  });  
                };  
          var put=function (req,res){ 
         if(req.files){

          if(req.files.org_logo){

             let rcvdImage = req.files.org_logo;
              let fileName = Math.random().toString(36).slice(2);
              let destPath = "uploads/images/"+fileName+".jpg";
              // Use the mv() method to place the file somewhere on your server
              rcvdImage.mv("public/"+destPath, function(err) {
                req.body.org_logo = destPath

                  db('organization').update({id:req.params.id},req.body).exec(function (err, data){  
                  if(err){  
                    res.status(500).send(err);  
                  }else{  
                    db('organization').findOne({id:req.params.id}).exec(function(err,data){  
                      if(err){  
                        res.status(500).send(err);  
                      }else{  
                        res.json(data)  
                      }  
                    });  
                  }  
                });   
               
              })
            }
            else if (req.files.org_cover){

             let rcvdCover = req.files.org_cover;
              let fileNameCover = Math.random().toString(36).slice(2);
              let destPathCover = "uploads/images/"+fileNameCover+".jpg";
              // Use the mv() method to place the file somewhere on your server
              rcvdCover.mv("public/"+destPathCover, function(err) {
                req.body.org_cover = destPathCover

                  db('organization').update({id:req.params.id},req.body).exec(function (err, data){  
                  if(err){  
                    res.status(500).send(err);  
                  }else{  
                    db('organization').findOne({id:req.params.id}).exec(function(err,data){  
                      if(err){  
                        res.status(500).send(err);  
                      }else{  
                        res.json(data)  
                      }  
                    });  
                  }  
                });   
               
              })


            } 
            }else{
              console.log(req.body)
               delete req.body.org_logo;
               delete req.body.org_cover;
                          
          db('organization').update({id:req.params.id},req.body).exec(function (err, data){  
                  if(err){  
                    res.status(500).send(err);  
                  }else{  
                    db('organization').findOne({id:req.params.id}).exec(function(err,data){  
                      if(err){  
                        res.status(500).send(err);  
                      }else{  
                        res.json(data)  
                      }  
                    });  
                  }  
                }); 
            }
              
              };  
          var del=function (req,res){  
                  db('organization').destroy({id:req.params.id}).exec(function (err){  
                    if(err){  
                      res.status(500).send(err);  
                    }else{  
                      res.send('User with id: '+req.params.id+' has been deleted');  
                    }  
                  });  
                };  
            var putmain=function (req,res){ 
           console.log(req.files);
              if(req.files){
                
                               let rcvdImage = req.files.org_logo;
                                let fileName = Math.random().toString(36).slice(2);
                                let destPath = "uploads/images/"+fileName+".jpg";

                               let rcvd_c_Image = req.files.c_pic;
                              let file_c_Name = Math.random().toString(36).slice(2);
                              let c_destPath = "uploads/images/"+file_c_Name+".jpg";
                              rcvd_c_Image.mv("public/"+c_destPath, function(err) {
                                  console.log("user image upload")

                              })
                                // Use the mv() method to place the file somewhere on your server
                                rcvdImage.mv("public/"+destPath, function(err) {
                                  req.body.org_logo = destPath
                                    db('user').findOne({email: req.body.c_email}).exec(function(err,data){ 
                                      if(err){ 
                                        res.status(500).send(err); 
                                      }else{ 
                                        if(data){
                                          res.json({success:false,message:"email already exist"})
                                        }
                                        else{

                                                  db('organization').create(req.body).exec(function(err,data){ 
                                                    if(err){ 
                                                      res.status(500).send(err); 
                                                    }else{ 

                                                          db('user').create({image:c_destPath ,contact_phone:req.body.c_phone,name:req.body.c_name,email:req.body.c_email,password:req.body.password,profile:data.id,role:'1'}).exec(function(err,data){ 
                                                            if(err){ 
                                                              res.status(500).send(err); 
                                                            }
                                                             acl.addUserRoles( data.id , req.body.role );
                                                          });  
                                                      res.status(201).json(data); 
                                                    } 
                                                  });

                                        }

                                      }  
                                    }); 

                                })
                         }else{
                      
                            delete req.body.org_logo;
                             delete req.body.c_pic ;
                              db('organization').update({id:req.params.id},req.body).exec(function(err,data){ 
                                if(err){ 
                                  res.status(500).send(err); 
                                }else{ 
                               if(data){
                                    db('organization').findOne({id: req.params.id}).populate("admin").exec(function(err,data){ 
                                        if(err){ 
                                          res.status(500).send(err); 
                                        }else{ 
                                             db('user').update({id:data.admin[0].id},{contact_phone:req.body.c_phone,name:req.body.c_name,email:req.body.c_email,password:req.body.password,role:'1'}).exec(function(err,data){ 
                                                if(err){ 
                                                  res.status(500).send(err); 
                                                }
                                                  else{
                                                       db('organization').findOne({id: req.params.id}).populate("admin").exec(function(err,data){ 
                                                          if(err){ 
                                                            res.status(500).send(err); 
                                                          }else{
                                                            res.json(data)
                                                          }
                                                       })
                                                    
                                                  }
                                              });  
                                        }  
                                      });  
                                     
                                      
                                 
                                } 
                                }
                              });

                                   
                         } 
             
              };
          return {  
            get:  get,  
            post:   post,  
            getOne: getOne,  
            put:  put,  
            delete: del  ,
            putmain:putmain
          }  
        }  
        module.exports=organization;  
