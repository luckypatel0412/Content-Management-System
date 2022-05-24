const express= require('express');
const router= express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');
const faker= require('faker');
const{userAuthenticated}= require('../../helpers/authentication');

//userAuthenticated,

router.all('/*', (req,res,next) =>{
    req.app.locals.layout='admin';
    next();
});

router.get("/", (req,res) =>{

        Post.count({}).then(postCount=>{
            Category.count({}).then(categoryCount=>{
                Comment.count({}).then(commentCount=>{
                    res.render("admin/index", {postCount: postCount, categoryCount:categoryCount, commentCount: commentCount});
                })
                
            })
        
     
});
});

router.post('/generate-fake-posts',(req,res) =>{

    //res.send('its work');
    
    for(let i =0; i< req.body.amount; i++){
        
        let post= new Post();
        post.title=faker.name.title();
        post.status='public';
        post.allowComments=faker.datatype.boolean();
        post.body=faker.lorem.sentence();
        post.slug=faker.name.title();

        post.save(function(err){
            if(err) throw err;
        });
       
    }
    res.redirect('/admin/posts');
})

// router.get("/dashboard", (req,res) =>{
//     res.render("admin/dashboard");
     
// });

module.exports=router;