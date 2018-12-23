// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var MongoClient = require('mongodb').MongoClient;
//const Schema=MongoClient.Schema
// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    recipeId: Number,
    recipeUser: String,
    recipeCategory: String,
    recipeName: String,
    recipeInstructions: String,
    recipePicture: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
//module.exports=MongoClient.model("Data", DataSchema );