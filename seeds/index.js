const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log("CONNECTION ERROR");
    console.log(err);
  });

  //returns a random element in an array e.g array[4]
  const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }

  //asynchronous function that seeds the database, it deletes everything first 
  //and replaces the data with new sets of data.
  const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //YOUR USER ID, MAKE SURE THIS USER EXISTS IN THE USER COLLECTIONS IN YOUR DB
            author: "64d9530773c37d2dbe4a6840",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
              {
                url: 'https://res.cloudinary.com/davmjz48k/image/upload/v1692681920/YelpCamp/ria9uk9ppzero6fygayb.jpg',
                filename: 'YelpCamp/ria9uk9ppzero6fygayb'
              }
            ],
            geometry: {
              type: 'Point',
              coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae fugit excepturi quibusdam magni modi incidunt culpa possimus molestiae nulla. Cupiditate obcaecati exercitationem pariatur rem quisquam optio ab harum quibusdam quia`,
            price: price
        })
        await camp.save();
    }
  }

  //seedDB returns a promise therefore it is thenable
  //so i can attach a .then in order to close the database 
  //after it has been seeded.
  seedDB().then(() => {
    mongoose.connection.close();
    console.log('DATABASE CLOSED');
  });