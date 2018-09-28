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

// creates a new song
const postSong = (postObj, callback) => {
  const { name, plays, likes, reposts } = postObj;

  Songs.find().sort({id: -1}).limit(1)
  .exec((err, data) => {
    if (err) throw err
    let lastId = data[0].id;

    
    const newSong = new Songs({
      id: lastId + 1, 
    });
    
    if (name) {newSong.name = name} else {newSong.name='Name not specified'};
    if (plays) {newSong.plays = plays} else {newSong.plays=0};
    if (likes) {newSong.likes = likes} else {newSong.likes=0};
    if (reposts) {newSong.reposts = reposts} else {newSong.reposts=0};
    
    newSong.save((err, song) => {
      if (err) throw err;
      console.log(song)
      callback(song);
    });
  });
};

// get stats for all songs
const getAllSongs = (callback) => {
  Songs.find({}, (err, data) => {
    if (err) throw err;
    callback(data);
  });
};

// gets stats for a single song
const getSong = (id, callback) => {
  Songs.find({ id }, callback);
};

const updateSongs = (id, data, callback) => {
  Songs.findOneAndUpdate({id: id}, data, callback());
}

// delete stats for a single song
const deleteSong = (id, callback) => {
  Songs.deleteOne({ id: id }, (err) => {
    if (err) throw (err);
    callback()
  });
}

module.exports = {
  getAllSongs: getAllSongs,
  getSong: getSong,
  postSong: postSong,
  deleteSong: deleteSong,
  updateSongs: updateSongs
}