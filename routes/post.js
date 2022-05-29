const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose")

const app = express.Router();

// Model Imports
const postModel = require("../database/models/posts");

app.route("/").post(async (req, res) => {
    console.log("saving post: ", req.body)
    let savedPost = await savePost(req.body)
    if(savedPost){
        res.status(200).json({mssg: "Post Saved", post: JSON.stringify(savedPost)})
    }
    else{
        res.status(400).json({ err: "Something went wrong while saving post" });
    }
})
.get(async (req, res) => {
    console.log("quers: ", req.query)
    let userId = req.query.userId
    userId = mongoose.Types.ObjectId(userId)
    
    let feeds = await userFeedPosts(userId)
    
    res.status(200).json({mssg: "Retrieved user Feeds", feeds: JSON.stringify(feeds)})
})

// Functions
async function savePost(post){
    return await postModel.create(post)
}

async function userFeedPosts(userId){
    return await postModel.find({createdBy: userId})
}

module.exports = app;
