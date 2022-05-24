const express = require("express");
const app= express();
const PORT=process.env.PORT || 4000;
const path = require("path");
const e=require('express-handlebars');  
const Handlebars = require("handlebars");
const mongoose=require('mongoose');
const bodyParser= require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const  methodOverride = require('method-override');
const upload= require('express-fileupload');
const flash=require('connect-flash');
const session=require('express-session');
const {mongoDbUrl} = require('./config/database')
const passport= require('passport'); 

mongoose.Promise=global.Promise;

mongoose.connect(mongoDbUrl)
.then((db) =>{
    console.log('Mongo connected')
}).catch((err) =>{
    console.log( err)
});



app.use(express.static(path.join(__dirname,'public')));
 const static_path = path.join(__dirname,"./public");
app.use(express.static(static_path));

//SET VIEW ENGINES

const {select, GenerateTime, paginate} = require('./helpers/handlebars-helpers');

app.engine('handlebars', e.engine({ defaultLayout: 'admin',handlebars: allowInsecurePrototypeAccess(Handlebars),helpers: {select: select, GenerateTime:GenerateTime,paginate: paginate}}));   


app.set('view engine','handlebars');

//Upload middleware

app.use(upload());

// Flash and Session

app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

//PASSPORT

app.use(passport.initialize());
app.use(passport.session());

//Local Variables using Middleware

app.use((req,res, next) =>{

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');

    res.locals.delete_msg = req.flash('delete_msg');

    res.locals.error_message= req.flash('error_message');
    

    next();
})


// Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'))


//Load Routes
const home=require('./routes/home/index'); 
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');
const categories=require('./routes/admin/categories');
const comments=require('./routes/admin/comments');
//Use Routes

app.use('/', home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);


app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})