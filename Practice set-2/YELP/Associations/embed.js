const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true});
//USER- email, name;


var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);
//
// //POST- title, content
//
//
//
// var newUser = new User({
//   email: "sauravkumar1137@gmail.com",
//   name: "saurav"
// });
//
// newUser.posts.push({
//   title: "How to play cricket",
//   content: "I can teach you that!!"
// });


// var newPost = new Post({
//   title: "random title",
//   content: "KJGHGJK"
// });
// newUser.save((err, user) => {
//   if(err) throw err;
//   console.log(user);
// });
User.findOne({name: "saurav"}, (err, user) => {
  if(err) throw err;
  console.log(user);
  user.posts.push({
    title: "three things i really hate",
    content: "Voldemort, Voldemort and Voldemort"
  });
  user.save((err, user) => {
    if(err) throw err;
    console.log(user);
  })
})
