const express = require("express");
require("dotenv").config()
const app = express();
const connectDB = require("./config/database_config");
const path = require("path")
const cors = require("cors")
// const PORT = 5000;

const user_route = require("./routes/userRoute")
const catergory_route = require("./routes/categoryRoute");
const post_route = require("./routes/postRoute");
const comment_route = require("./routes/commentRoute");
const like_route = require("./routes/likeRoute");
// const chapter_route = require("./routes/chapterRoute"); *POST SECTIONS
// const bookmark_route = require("./routes/bookmarkRoute");
// const library_route = require("./routes/libraryRoute"); *VIEW ALL POSTS BY USER/USERS

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get('/', (req, res) => {
    res.send("Welcome to the Buzzfeed_Clone_API Backend")
});

app.use("/api/users", user_route)
app.use("/api/category", catergory_route)
app.use("/api/posts", post_route)
app.use("/api/comments", comment_route)
app.use("/api/likes", like_route)
// app.use("/api/chapters", ) *POST SECTIONS
// app.use("/api/bookmark", )
// app.use("/api/library", library_route) *VIEW ALL POSTS BY USER/USERS


app.listen(process.env.PORT, () => {
    console.log("Server Started Successfully");
    connectDB();
});