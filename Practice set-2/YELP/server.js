const express = require('express'),
  hbs = require('hbs'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  seedDB = require("./seed"),
  Comment = require('./models/comment');

seedDB();

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});



app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) console.log("We got into error");
    res.render("campgrounds/index", {
      campgrounds: allCampgrounds
    })
  })
  // res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: desc
  };
  Campground.create(newCampground, (err, campground) => {
    if (err) console.log("error");
    console.log("Newly Created Item");
  });
  res.redirect('/campgrounds');

});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})

app.get('/campgrounds/:id', (req, res) => {
  // FInd the campground with provided id and render the page with that info.
  var id = req.params.id;
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) throw err;
    console.log(foundCampground);
    res.render('campgrounds/show', {campground: foundCampground});
  });

})

app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) throw err;
      res.render('comments/new', {campground: campground});
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
  //lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log("error");
      res.redirect('/show');
    }else{
      console.log(req.body.comment);
      Comment.create(req.body.comment, (err, comment) => {
        if(err) console.log("There is error in comment");
        else{
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${req.params.id}`)
        }
      })
    }
  })
  //create new comments
  //connect campground to show page
  //redirect campground to show page
})

app.listen(4000, (err) => {
  console.log("Server started at PORT 4000");
})


// REST: Representational State Transfer. It basically helps us in mapping http to CRUD
// RESTFUL ROUTE

// name       url         verb    desc
// -----------------------------------------------------------
// INDEX      /dogs       GET     Display a list of dog
// NEW        /dogs/new   post    Display form to make a new dog
// CREATE     /dogs       POST    Add new dog to DB
// SHOW       /dogs/:id   GET     Shows info about one dog
