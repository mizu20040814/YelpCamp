const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDB OK!!!!');
    })
    .catch(err => {
        console.log('MongoDB Error!!!!');
        console.log(err);
    })

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 2000) + 1000;
        const camp = new Campground({
            author: '6815e69b5739fe468cf1ec61',
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/djsayvgav/image/upload/v1746435710/YelpCamp/vdhtq6xqdpbrmf6diy0y.jpg',
                    filename: 'YelpCamp/vdhtq6xqdpbrmf6diy0y'
                }
            ],
            description: 'そしてもうそのかたちは天気輪の柱の下に、白い岩が、まるでがらあきで、向こうの河岸に二本の柱の下に置いた鞄をもって来て立ちました。二人がそのあかしの前を通り、改札口の電燈がだんだん大きくなって、その一つの、ほんとうの天上へさえ行ける切符だ。なんだかその中へ吸い込まれてしまうような気がしてしかたないらしいのでした。',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude
                ]
            },
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})