const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
// const io = require("../main");

const app = express.Router();

// Model Imports
const commentModel = require("../database/models/comments");

// Sockets
// io.on("connection", (socket) => {

  
// })


app.route("/").post(async (req, res) => {
    console.log("logging comment post: ", req.body)
    let commentObj = req.body
    
    let comment = await saveComment(commentObj);

    res.status(200).json({mssg: "comment saved", comment: comment})
})
.get(async (req, res) => {
    let feedId = req.query.feedId
    let comments = await getComments(feedId);
    comments = comments.map(comment => {
        if(comment.postedBy){
            comment.postedBy = comment.postedBy[0];
        }
        return comment;
    })
    // console.log("comments: ", comments)
    res.status(200).json({mssg: `retrieved ${comments.length} comments`, comments: comments})
})

// Functions

async function saveComment(commentObj){
    return await commentModel.create(commentObj)
}

async function getComments(feedId){
    return await commentModel.aggregate([
      {
        $match: {
          feedId: mongoose.Types.ObjectId(feedId),
        },
      },
      {
          $sort: {
              createdAt: -1
          }
      },
      {
          $lookup: {
              from: 'users',
              localField: 'postedBy',
              foreignField: '_id',
              as: 'postedBy'
          }
      }
    ]);
}

module.exports = app;