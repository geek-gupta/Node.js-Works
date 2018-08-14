const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});
//USER- email, name;


var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

var User = mongoose.model("User", userSchema);

// Post.create({
//   title: "how to cook the best burger-part3",
//   content: "adfsgdwefgdgfadfgdgfadfsd"
// }, (err, post)=> {
//    // console.log(post);
//    User.findOne({name: "Bob"}, (err, foundUser) => {
//      if(err) throw err;
//      foundUser.posts.push(post);
//      foundUser.save((err, data) => {
//        console.log(data);
//      })
//    })
// });


//Find user
// Find all the post for that

User.findOne({name: "Bob"}).populate("posts").exec((err, user) => {
  if(err) throw err;
  console.log(user);
})


// User.create({
//   email: "Bob@gmail.com",
//   name: "Bob"
// })
