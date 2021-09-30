const express = require('express');

const bodyParser = require('body-parser');

const app = express();



const mongoose = require("mongoose");



app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/todoDB");

const itemSchema ={
  name : String
};

const item = mongoose.model("item", itemSchema);



const item1 = new item ({
  name : "Welcome to your to do list!"
});
const item2 = new item ({
  name : "Press the + button to add the item"
});
const item3 = new item ({
  name : "<-- Hit this to cross out the item."
})

const arr = [ item1, item2, item3];




app.get("/", function(req, res) {

  item.find({}, function(err, result){
    if(result.length === 0){
      item.insertMany(arr, function(err){
        if(err){
          console.log(err);
      
        }
        else{
          console.log("Items added to DB!");
        }
      });
      res.redirect("/");

        
    }
    else{

      res.render("list", {
        listTitle: "Today",
        newListItems: result
      });

      
    }
  })

});




app.post("/", function(req, res) {
  const itemName =  req.body.newItem;

  const user_item  =new item({
    name: itemName,

  });

  user_item.save();
  
  res.redirect("/");
  
});


app.post("/delete", function(req,res){
   const user_del = req.body.checkbox

  item.findByIdAndRemove(user_del, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log(" Deleted from DB");

    }
  });

  res.redirect("/");

});






app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
})



app.post("/work", function(req, res) {
  res.redirect("/work");
})


app.get("/about", function(req,res){
  res.render('about');
})


app.listen(3000, function() {
  console.log("Server up and running in PORT:3000");

});


