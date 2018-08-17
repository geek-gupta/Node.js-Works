var mongoose = require('mongoose');
var comment = require('./models/comment');
var Campground = require('./models/campground');

var data = [{
    name: "Cloud's Rest",
    image: "https://cdn.vox-cdn.com/thumbor/C1SdoDActSv8tPONx_OjwEobUjw=/0x0:1004x753/1200x800/filters:focal(0x0:1004x753)/cdn.vox-cdn.com/uploads/chorus_image/image/49523369/20150428-cloud-computing.0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Rose Love",
    image: "http://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d4bf6d5c21644279a61c913031cd25d",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    name: "Iphone 7",
    image: "https://i.ytimg.com/vi/20Ni4Jqz2XA/maxresdefault.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

var seedDB = () => {

  // Remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) console.log("err");
    console.log("Data Removed");
    // add a few campgroundSchema
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) console.log("error");
        console.log("added a campground");
        // add a few comments
        comment.create({
          text: "This place is great, but I wish there was Internet",
          author: "Homer"
        }, (err, commentData) => {
          if(err) throw err;
          campground.comments.push(commentData);
          campground.save();
          console.log("Created some commnets");
        });
      })
    })
  });
}



module.exports = seedDB;
