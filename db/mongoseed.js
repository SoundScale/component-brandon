const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/songs', { useNewUrlParser: true });

const songSchema = new mongoose.Schema({
  id: Number,
  name: String,
  plays: Number,
  likes: Number,
  reposts: Number,
});

const Songs = mongoose.model('Songs', songSchema);

const randNumPlays = function generateRandomNumber() { return Math.floor(Math.random() * 10000); };
const randNumLikes = function generateRandomNumber() { return Math.floor(Math.random() * 1000); };
const randNumReposts = function generateRandomNumber() { return Math.floor(Math.random() * 500); };

for (let i = 0; i < 100; i += 1) {
  const stat = new Songs({
    id: i + 1, plays: randNumPlays(), likes: randNumLikes(), reposts: randNumReposts(),
  });
  stat.save();
}

// db.dropDatabase();
//mongoimport --db soundscale --type csv --headerline --file /home/brandon/Projects/Javascript/component-brandon-socialArea/db/songswithsocialdatawithheader.csv

// db.songswithsocialdatawithheader.find({id: 1}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 1000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 2000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 3000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 4000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 5000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 6000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 7000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 8000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 9000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({id: 10000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 'mint green protocol 1'}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 1000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 2000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 3000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 4000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 5000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 6000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 7000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 8000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 9000000}).explain("executionStats")
// db.songswithsocialdatawithheader.find({name: 10000000}).explain("executionStats")