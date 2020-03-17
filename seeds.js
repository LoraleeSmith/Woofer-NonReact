var mongoose = require("mongoose");
var Park = require("./models/park");
var Comment = require("./models/comment");
mongoose.connect('mongodb://localhost:27017/park_app')

var data = [
    {
        name: "Woodland Off Lease Dog Park",
        image: "https://images.unsplash.com/photo-1532717681453-5fe8155b6cdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Fenced in, a area for small dogs and an area for big dogs",
        author: {
            username: "Levy"
        }
    },
    {
        name: "Toad Hollow Off Leash Dog Park",
        image: "https://localwiki.org/media/cache/bf/fb/bffbec85181eefc6091e7be89c0dde55.jpg",
        description: "Fenced in, a area for small dogs and an area for big dogs, pond is off limits",
        author: {
            username: "Elizabeth"
        }
    },
    {
        name: "Carlisle Family Dog Park",
        image: "https://images.unsplash.com/photo-1511189793577-e3b13e4d966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "grass and bark, big fenced in area",
        author: {
            username: "John"
        }
    },
    {
        name: "Westcrest Dog park",
        image: "https://photos.bringfido.com/attractions/3777/26048_3777.jpg?size=slide&density=1x",
        description: "very grassy, lots of space",
        author: {
            username: "Joe"
        }
    }
]

Park.insertMany(data).then(function (databaseResponse) {
    console.log(databaseResponse)
});

function seedDB() {
    //Remove all parks
    // Park.remove({}, function (err) {
    //   if (err) {
    //       console.log(err);
    //   }
    //   console.log("removed parks!");
    //  });
}

module.exports = seedDB;