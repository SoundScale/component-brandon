const express = require('express');
const cors = require('cors');
const { getSong, postSong, getAllSongs, deleteSong, updateSongs } = require('../db');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static('public'));
app.use('/songs/:id', express.static('public'));

// create new stats for song
app.post('/api/stats/', (req, res) => {
  const { name, plays, likes, reposts } = req.body;
  const postObj = {
    name,
    plays,
    likes, 
    reposts 
  };
  postSong(postObj, 
    (song) => {
      res.status(201).json(song);
    }
  );
});

// get stats for all songs
app.get('/api/stats/', (req, res) => {
  getAllSongs(data => {
    res.json(data);
  });
});

// get stats for one song
app.get('/api/stats/:id', (req, res) => {
  getSong(req.params.id, (err, data) => {
    res.json(data);
  });
});

// updates stats for one song
app.patch('/api/stats/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let dataToUpdate = {};
  if (req.body.plays) { dataToUpdate.plays = parseInt(req.body.plays) };
  if (req.body.likes) { dataToUpdate.likes = parseInt(req.body.likes) };
  if (req.body.reposts) { dataToUpdate.reposts = parseInt(req.body.reposts) };
  updateSongs(
    id, 
    dataToUpdate, 
    res.status(204)
  )
});

// delete stats for one song
app.delete('/api/stats/:id', (req, res) => {
  deleteSong(parseInt(req.params.id), () => res.status(204).send());
});



app.listen(port, () => console.log(`Listening to port ${port}...`));