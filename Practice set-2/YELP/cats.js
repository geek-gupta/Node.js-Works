// What is mongoose: Its a ODM : Object Data Mapper. Its a way to write javascript code than interact with database;

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true});


var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});


var Cat = mongoose.model("Cat", catSchema);


// var george = new Cat({
//   name: "George",
//   age: 11,
//   temperament: "Grouchy"
// });
//
// var norris = new Cat({
//   name: "Mrs. Norris",
//   age: 101,
//   temperament: "Funky"
// })

//Every mongoose function will require a callback function
// george.save((err, cat) => {
//   if(err) console.log("something went wrong");
//   else console.log("we just saved a cat to database");
//   console.log(cat);
// });


// norris.save((err, cat) => {
//   if(err) console.log("something went wrong");
//   else console.log("we just saved a cat to database");
//   console.log(cat);
// });

// Either we can first make a new cat and
// then save it or use Create directly on Cat and create one as shown below


Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Bland"
}, (err, cat) => {
  if(err) console.log("Error");
  else console.log(cat);
});


Cat.find({}, (err, cats) => {
  if(err) console.log("Oh No Error");
  else console.log("All the cats");
  console.log(cats);
})

















//
