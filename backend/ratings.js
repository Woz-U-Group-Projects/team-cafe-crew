// /backend/ratings.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var MongoClient = require('mongodb').MongoClient;
//const Schema=MongoClient.Schema
// this will be our data base's data structure 
const RatingsSchema = new Schema(
  {
    recipeId: Number,
    recipeName: String,
    recipeRating: Number

  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Ratings", RatingsSchema);
//module.exports=MongoClient.model("Data", DataSchema );