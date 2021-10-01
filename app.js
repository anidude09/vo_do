const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const  _ = require('lodash');



const mongoose = require("mongoose");
const { response } = require('express');



app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/todoDB");

const itemSchema ={
  name : String
};

const listSchema = {
  name : String,
  items : [itemSchema]
};



const item = mongoose.model("item", itemSchema);

const list = mongoose.model("list", listSchema);




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
  const listName = req.body.list;

  const user_item  =new item({
    name: itemName,

  });


  if(listName === "Today"){
    user_item.save();
    res.redirect("/");
  }
  else{
    list.findOne({name: listName}, function(err, foundList){
      foundList.items.push(user_item);
      foundList.save();
      res.redirect("/" + listName);

    })
  }
  
});


app.post("/delete", function(req,res){
  const user_del = req.body.checkbox;

  const listName = req.body.listName;

  if(listName === "Today"){
    item.findByIdAndRemove(user_del, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(" Deleted from DB");
  
      }
    });
  
    res.redirect("/");

  }
  else{

    list.findOneAndUpdate({name : listName},{$pull : {items :{ _id : user_del}}},function(err,found){
      if(!err){
        res.redirect("/"+ listName);
        console.log("Del from list DB");
      }
    })

  }




  

});



app.get("/:customListName", function(req,res){

  const listName = _.capitalize(req.params.customListName) ;


  list.findOne({name: listName}, function(err, foundList){
    if(!err){
      if(!foundList){
        const new_list = new list({
          name: listName,
          items: arr
        });
        
        
        new_list.save();

        res.redirect("/" + listName);
        
      
      }
      else{
        res.render("list", {
          listTitle: foundList.name,
          newListItems : foundList.items
        });
      }
    }
    else{
      console.log(err);
    }
  });

  

});







app.post("/work", function(req, res) {
  res.redirect("/work");
})


app.get("/about", function(req,res){
  res.render('about');
})


app.listen(3000, function() {
  console.log("Server up and running in PORT:3000");

});


