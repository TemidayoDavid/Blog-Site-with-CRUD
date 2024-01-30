import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// take posts input
function Posts(title, content){
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

//add posts
function addPost (title, content){
    let post = new Posts(title, content);
    posts.push(post);
}

//delete posts
function deletePost (index){
    posts.splice(index, 1);
}

//update posts
function updatePost (title, content, index){
    posts[index] =  new Posts(title, content);
   
}

//home
app.get("/", (req, res) => {
    res.render("home.ejs", {posts:posts})
})

//create new post
app.get("/create", (req, res) => {
    res.render("create.ejs")
})
// add post and send back to home
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    addPost (title, content);

    res.redirect("/");

})

// view selected post
app.get("/view/:id", (req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content})
})

app.post("/delete", (req, res) =>{
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
})

app.get("/edit/:id", (req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId:index, title:post.title, content:post.content})

})

app.post("/update", (req, res) =>{
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"]
    updatePost (title, content, index);
    res.redirect("/")
console.log(index);
})

app.listen(port, () => {
   addPost("Bereshit bara elohim et ha' shamayim ve'et ha'aaretz.", "Those hebrew words, herald the beginning of an adventure one in which, God is the opening of the book. \nIt literally means In the beginning (Bereshit); God (Elohim); created (bara); the heavens (ha'shamayim); and (ve); the earth (ha'aaretz).")
    console.log(`Listening on port ${port}`);
    
  });