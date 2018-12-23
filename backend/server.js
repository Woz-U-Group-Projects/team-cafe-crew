var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const Data = require("./data");
const API_PORT = 3001;
const bodyParser = require("body-parser");
const logger = require("morgan");
const express = require("express");
const app = express();
const router = express.Router();
const dbRoute = "mongodb://skmeyer2019:wozu2019@ds259001.mlab.com:59001/exeter";


// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));



// this is our get method
// this method fetches all available data in our database
router.get("/viewAllRecipes", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });

  MongoClient.connect(dbRoute, function(err, dbase) {
    if (err) throw err;
    var dbo = dbase.db("exeter");
    dbo.collection("recipes").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      dbase.close();
    });
  });  

    return res.json({ success: true, data: data });
  });

});

 router.post("/putData", (req, res) => {

 
     let data = new Data();
   console.log(req.body);
      MongoClient.connect(dbRoute, function(err, dbase) {
       
          if (err) throw err;
          var dbo = dbase.db("exeter");
          var newDoc={recipeId:1, recipeUser: req.userName, recipeCategory: req.category, recipeName: req.recipeTitle,recipeInstructions: req.recipeInstructions, recipePicture: req.recipePicture };
          dbo.collection("recipes").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted!");
            dbase.close();
          });
         
    });
  });

  app.use("/api", router);

  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));