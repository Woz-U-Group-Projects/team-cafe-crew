var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const Data = require("./data");
const RatingsData = require("./ratings");
const API_PORT = 3001;
const bodyParser = require("body-parser");
const logger = require("morgan");
const express = require("express");
const app = express();

const router = express.Router();
var mongojs = require('mongojs');
const dbRoute = "mongodb://skmeyer2019:SDale2019@ds245234.mlab.com:45234/recipes";
const dbRatings = "mongodb://skmeyer2019:SDale2019@ds145304.mlab.com:45304/reciperatings";

//const dbRoute = "mongodb://team_java:virtual_cafe1@ds135724.mlab.com:35724/virtualcafe";
// connects our back end code with the database

/*

*/
let dbJs=mongojs(dbRoute, ["recipes"]);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/*
const connRecip=mongoose.createConnection(dbRoute);
const recipeSchema= new mongoose.Schema({recipeId: Number, recipeUser: 'string', recipeCategory: 'string', recipeName: 'string', recipeInstructions: 'string', recipePicture: 'string'});

const recipeCollection=connRecip.model('recipes', recipeSchema);
const rec = new recipeCollection;
rec.save();
*/

//let ratingsSchema=new mongoose.Schema({recipId: 'Number', recipName: 'String', ratingNumber: 'Number' });
//let ratingsModel=mongoose.model('reciperatings',ratingsSchema );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//var recipeSchema= new mongoose.Schema({recipeId: Number, recipeUser: 'string', recipeCategory: 'string', recipeName: 'string', recipeInstructions: 'string', recipePicture: 'string'});



// this is our get method
// this method fetches all available data in our database

 /*
router.get("/viewAllRecipes", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
   // console.log(res.json({ success: true, data: data }));
    return res.json({ success: true, data: data });
  });

 */

 /*
router.get("/viewAllRecipes", (req, res) => {
  recipeCollection.find({}, function(err, docs) {
    if (err)
      console.log('error occured in the database');
    console.log(docs);
  //res=docs;
   return docs[1];
   }); 
  */

 mongoose.connect(dbRoute, {useNewUrlParser: true});
 router.get("/viewRatingsByIdNo/recipeId/:recipeId",  (req, res) =>  {
  RatingsData.find({recipeId: req.params.recipeId }, (err,data) => { // 
    if (err) return res.json({ success: false, error: err });
    console.log(data);
   
    res.json({ success: true, data: data });
  });
  
 });
 //{"$regex": recipeId, "$options": "i" } 
 router.get("/viewRatingsByRecipeName/recipeName/:recipeName", (req, res) => {
   RatingsData.find({recipeName: new RegExp(req.params.recipeName,"i")},  (err,data) => { 
 // RatingsData.find({recipeName: req.params.recipeName},  (err,data) => { 
    if (err) return res.json({ success: false, error: err });
    console.log(data);
    res.json({ success: true, data: data });
  });

 
 });

 router.get("/viewAllRecipes", (req, res) => {
   /*
  mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
  );
  */
//mongoose.disconnect();

//connRecipes.connect();

//mongoose.model('recipes');
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
 // console.log(data);
 
 //mongoose.disconnect();

    return res.json({ success: true, data: data });
   // mongoose.connection.close();
  });
});

// MongoClient.connect(dbRoute, function(err, dbase) {
  /*
    if (err) throw err;
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
       return res.json({ success: true, data: data })
       */
      //console.log(data);
     //return data;
   // });
   // var dbo = dbase.db("virtualcafe");
/*
   var dbo=dbase.db("exeter");
    dbo.collection("recipes").find({}).toArray( function(err, res) {
      if (err) throw err;
      console.log('ALL RECIPES:');
      console.log( res);
       dbase.close()

     return res;

     // return res.json({ success: true, data: data });
    });
*/

  //}); 
//}
//)

  //return res.json({ success: true, data: data });
  
  /*
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    // return res.json({ success: true, data: data })
    console.log(data.json());
   return data;
  });

});
*/
/*
 router.post("/putData", (req, res) => {

 
     let data = new Data();
   console.log(req.body);
      MongoClient.connect(dbRoute, function(err, dbase) {
       
          if (err) throw err;
         // var dbo = dbase.db("virtualcafe");
         var dbo=dbase.db("recipes");
          var newDoc={recipeId:1, recipeUser: req.userName, recipeCategory: req.category, recipeName: req.recipeTitle,recipeInstructions: req.recipeInstructions, recipePicture: req.recipePicture };
          dbo.collection("recipes").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted!");
            dbase.close();
          });
         
    });
  });
  */


router.post("/submitRatingToDB", (req, res) => {
  //mongoose.createConnection(dbRatings);
//var schemaRatings= new mongoose.Schema({recipeId: 'number', recipeName: 'string', recipeRating: 'number'});
 //var modelRating = mongoose.model('ratings', schemaRatings);
 //var connRating=mongoose.createConnection(dbRatings);
 //var theRating=connRating.model('ratings',schemaRatings);
 //mongoose.disconnect();
 //mongoose.disconnect();
 //mongoose.model('reciperatings');
 let ratingData=new RatingsData();
 const{recipeId, recipeName, recipeRating}=req.body;
 ratingData.recipeId=recipeId;
 ratingData.recipeName=recipeName;
 ratingData.recipeRating=recipeRating;
 console.log("RATING DATA:");
 console.log(req.body);
 ratingData.save(err => {
  if (err) return res.json({ success: false, error: err });
 //mongoose.disconnect();
 //mongoose.connect(dbRoute);
  return res.json({ success: true });

});
});

router.post("/putData", (req, res) => {
  let data = new Data();
  console.log("POSTING");

  const { recipeId, recipeUser, recipeCategory, recipeName, recipeInstructions, recipePicture } = req.body;

  if ((!recipeId && recipeId !== 0) ) {
    return res.json({
      success: false,
      error: "Bad ID data"
    });
  }

  
  data.recipeId=recipeId;
  data.recipeUser=recipeUser;
  data.recipeCategory=recipeCategory;
  data.recipeName=recipeName;
  data.recipeInstructions=recipeInstructions;
  data.recipePicture=recipePicture;
 
  
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
  //  mongoose.connection.close();
    return res.json({ success: true });
  });
});

  app.use("/api", router);

  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));