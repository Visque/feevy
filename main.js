require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
// const jwt = require("jsonwebtoken")
const session = require("express-session");

const db = require("./database/index");
const userModel = require("./database/models/users");

db.start();

const PORT = 5000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
module.exports = io;

// Middlewares

app.use(cors());
app.use(express.json()); // for json data over req body
app.use(
  session({
    secret: "keyboard cat",
  })
);

// Route imports
const auth = require("./routes/auth");
const post = require("./routes/post");
const comment = require("./routes/comment");

// Route middlewares
app.use("/auth", auth);
app.use("/post", post);
app.use("/comment", comment);

server.listen(PORT, () => {
  console.log("servers up :)");
});
