const express= require('express');
const router= express.Router();
const Category = require('../../models/Category');
const faker= require('faker');
const{userAuthenticated}= require('../../helpers/authentication');
router.all('/*', (req,res,next) =>{
    req.app.locals.layout='admin';
    next();
});

router.get("/", (req,res) =>{
    Category.find({}).then(categories =>{
        res.render("admin/categories/index", {categories: categories});
    });
    //res.render("admin/categories/index");
     
});


router.post('/create',(req, res)=> {
     
    const newCategory = Category({
        name: req.body.name
    });
    newCategory.save().then(savedCategory =>{
        res.redirect('/admin/categories')
    })
})

router.get("/edit/:id", (req,res) =>{
    Category.findOne({_id: req.params.id}).then(category =>{

        res.render("admin/categories/edit", {category: category});
    });
    //res.render("admin/categories/index");
     
});

router.put("/edit/:id", (req,res) =>{
    Category.findOne({_id: req.params.id}).then(category =>{
        category.name=req.body.name;
        category.save().then(updateCategory=>{
            res.redirect("/admin/categories");
        })
        
      
    });
    //res.render("admin/categories/index");
     
});

router.delete('/:id', (req, res) => {
    Category.remove({_id: req.params.id})
    .then(result =>{
        res.redirect('/admin/categories')
         });

        
    });





module.exports=router;