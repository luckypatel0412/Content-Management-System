const path = require('path');
module.exports={
    
    uploadDir: path.join(__dirname,'../public/upload'),

   isEmpty: function(obj)
   {

         for(let key in obj)
         {
             if(typeof obj.key =='undefined')
             {
             return false;
             }
             
         }
         return true;
   }
};