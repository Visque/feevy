const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose")
const io = require("../main");

const app = express.Router();

// Model Imports
const postModel = require("../database/models/posts");
const commentModel = require("../database/models/comments");

// Sockets
io.on("connection", (socket) => {
    socket.on('send post', (post) => {
        io.emit("new post", post);
    })
    
    socket.on("join room", (feedId) => {
      socket.join(`feed-${feedId}`);
      // console.log(`joined  feed-${feedId} ::::: `, socket.rooms);
    });

    socket.on("leave room", (feedId) => {
      // console.log(`left  ${feedId}`);
      socket.leave(`feed-${feedId}`);
    });

    socket.on("send comment", (comment) => {
      // console.log(`posted feed-${comment.feedId}`);
      io.to(`feed-${comment.feedId}`).emit("new comment", comment);
    });
})

app.route("/").post(async (req, res) => {
    // console.log("saving post: ", req.body)
    let savedPost = await savePost(req.body)
    if(!savedPost){
        res.status(400).json({ err: "Something went wrong while saving post" })
        return
    }

    res.status(200).json({mssg: "Post Saved", post: JSON.stringify(savedPost)})
})
.get(async (req, res) => {
    // console.log("quers: ", req.query)
    let userId = req.query.userId
    let pageNumber = req.query.pageNumber
    let fpp = 10                            //    Feeds/Page
    userId = mongoose.Types.ObjectId(userId)
    
    // let feeds = await userFeedPosts(userId)
    let feeds = await allFeeds(pageNumber, fpp)
    
    feeds = await handleGetComments(feeds)
    // console.log("feedsd: ", pageNumber, feeds)
    
    res.status(200).json({mssg: "Retrieved user Feeds", feeds: JSON.stringify(feeds)})
})

// Functions

async function handleGetComments(feeds){
  // feeds.map(async (feed) => {                                  // await didnt work here :(
  //   let comments = await getPostComments(feed._id);
  //   feed.comments = comments;
  //   console.log("assigned");

  //   return feed;
  // });

  for (let feed of feeds){
    let comments = await getPostComments(feed._id);

    comments = comments.map((comment) => {
      if (comment.postedBy) {
        comment.postedBy = comment.postedBy[0];
      }
      return comment;
    });

    feed.comments = comments;
  }

  return feeds
}

async function savePost(post){
    return await postModel.create(post)
}

async function getPostComments(feedId) {
  

  return await commentModel.aggregate([
    {
      $match: {
        feedId: feedId,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "postedBy",
        foreignField: "_id",
        as: "postedBy",
      },
    },
  ]);

  // return await commentModel.find({ feedId: feedId });
}

async function allFeeds(pageNumber, fpp){
    return await postModel.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: pageNumber * fpp
      },
      {
        $limit: fpp,
      }
    ]);
}
module.exports = app;
