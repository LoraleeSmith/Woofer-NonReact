var mongoose = require("mongoose");
var Park = require("./models/park");
var Comment = require("./models/comment");
mongoose.connect('mongodb://localhost:27017/park_app')

var data = [
    {
        name: "Woodland Off Lease Dog Park",
        image: "https://www.google.com/maps/uv?hl=en&pb=!1s0x8084d6d5840dbe1f%3A0xcc00a2b7a9194b7a!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPM67IFu07Ovc00Q2dDQiJHomHT6SzsJxC5q-Ah%3Dw120-h160-k-no!5swoodland%20dog%20park%20-%20Google%20Search!15sCAQ&imagekey=!1e10!2sAF1QipOQ9Jc7VS3dV_Gsi-AtkPbVPBeL7piGE_KCItUd&sa=X&ved=2ahUKEwj4ibDqsPfnAhWItZ4KHZusB48QoiowE3oECA8QBg#",
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
        image: "https://www.google.com/maps/uv?hl=en&pb=!1s0x880567776bfde4a3%3A0x4c22d966b7bf5b74!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOnpwk9rTRXxdoJ2Bcp3ldQUeRdPQQruDcu34zr%3Dw213-h160-k-no!5scarlisle%20family%20dog%20park%20-%20Google%20Search&imagekey=!1e10!2sAF1QipMv8WviNJi5Q6L7TOq2xwjawZZjacMkdPxdWQx8&sa=X&ved=2ahUKEwih-4S5jPvnAhUNGKwKHbzlC4AQoiowCnoECBsQBg#",
        description: "grass and bark, big fenced in area",
        author: {
            username: "John"
        }
    }
]

Park.insertMany(data).then(function (databaseResponse) {
    console.log(databaseResponse)
});

function seedDB() {
    //Remove all parks
    Park.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed parks!");
    });
}

module.exports = seedDB;