const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const methodOveride = require("method-override");

app.use(express.urlencoded({extended : true}));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname ,"/views"))
app.use(express.static(path.join(__dirname , "public")));
const {v4: uuidv4} = require('uuid');
app.use(methodOveride("_method"));




app.get("/" , (req , res)=>{
    res.render("signup.ejs");
})

let posts = [
    {
        id:uuidv4(),
        username:"Ajit kumar pandit",
        content :"I love programming "
    },
    {
        id:uuidv4(),
        username:"shyam kumar pandit",
        content :"I love programming "
    },
    {
        id:uuidv4(),
        username:"sujjet kumar pandit",
        content :"I love programming "
    },
    {
        id:uuidv4(),
        username:"krish kumar pandit",
        content :"I love programming "
    },
    {
        id:uuidv4(),
        username:"Rita kumar pandit",
        content :"I love programming "
    },
    {
        id:uuidv4(),
        username:"babu kumar pandit",
        content :"I love programming "
    }
]

app.get("/posts" , (req , res)=>{
    res.render("index.ejs" , {posts});
})

app.get("/posts/new" , (req , res)=>{
    res.render("new.ejs");
})

app.post("/posts" , (req , res)=>{
    let { username , content} = req.body;
    let id = uuidv4();
    posts.push({ id , username , content});
    res.redirect("/posts");
})


app.get("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    
   res.render("show.ejs" , {post})

})

// patch request for existing content 

app.patch("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");

})


app.get ("/posts/:id/edit" , (req , res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    console.log(id);
    res.render("edit.ejs" , {post});

})

app.get("posts/signup/form" , (req , res)=>{
    res.render("signup.ejs");
})

app.delete("/posts/:id", (req , res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
})



app.listen(port , ()=>{
    console.log(`Listening on port ${port}`);
})