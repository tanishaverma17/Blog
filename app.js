const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/app");

//express app
const app = express();

//connect to database
const dbURI =
  "mongodb+srv://tanisha:Tani123@cluster0.fdx1l84.mongodb.net/blogweb?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
// app.set('views','myviews');

//listen to server
app.listen(3000);

//middleware static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//^ it is middleware to attach form data to req object
// app.use((req,res,next)=>{
//     console.log('new request');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     //it hangs and doesn't load
//     next();
// });

// app.use((req,res,next)=>{
//     //in the next middleware
//     next();
// });

app.use(morgan("dev"));

//mongoose and mogo sandbox routes

app.get("/", function (req, res) {
  res.redirect("/blogs");
  //   const blogs = [
  //     { title: "Hello World", snippet: "hi arev the for" },
  //     { title: "Hello 2 World", snippet: "hi arev the for" },
  //     { title: "Hello 3 World", snippet: "hi arev the for" },
  //   ];
  //res.send('<p>Welcome</p>');
  //res.sendFile('/views/index.html', {root: __dirname});
  //res.render("index", { title: "home", blogs });
});

app.get("/about", function (req, res) {
  // res.send('<p>About Page</p>');
  //res.sendFile('/views/about.html', {root: __dirname});
  res.render("about", { title: "about" });
});

// app.get('/about-us', (req,res)=>{
//     res.redirect('/about');
// })

app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  //res.status(404).sendFile('./views/404.html', {root: __dirname});
  // res.status(404);
  res.status(404).render("404", { title: "404" });
});

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog",
//     snippet: "about my new blog",
//     body: "more about new blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("64c170c9330b7e1d2f020540")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
