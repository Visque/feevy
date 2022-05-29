const mongoose = require("mongoose")

const url =
  process.env.MONGO_SECRET_URL;

module.exports.start = function (){
    mongoose.connect(url).then(function(){
        console.log("DB is connected to FEEVY :) ")
    })
    .catch(function(){
        console.log("Couldn't connect to database FEEVY :( ")
    })
}