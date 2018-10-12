require('dotenv').config();
require('newrelic');
const express = require('express');
const cors = require('cors');
const { cassandraGetSong , cassandraPostSong, cassandraUpdateSongs, cassandraDeleteSong} = require('../db/cassandraindex')
var bodyParser = require('body-parser');
var morgan = require('morgan')

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/songs/:id', express.static('public'));

app.get('/loaderio-*', (req, res) => {
  res.status(200).send(process.env.LOADERIO)
})

app.get('/healthy', (req, res) => {
  res.status(200).end();
})

// create new stats for song
app.post('/api/stats/', (req, res) => {
  const { name, plays, likes, reposts } = req.body;
  const postObj = {
    name: name ? name : 0,
    plays: plays ? plays : 0,
    likes: likes ? likes : 0, 
    reposts: reposts ? reposts : 0 
  };

  cassandraPostSong(postObj, result => res.status(201).json(name));
});


// -----------------------------------------------------------------------
// DEPRECIATED - THIS ACTION CAN NO LONG BE USED WITH THIS AMOUNT OF DATA!
// -----------------------------------------------------------------------

// // get stats for all songs
// app.get('/api/stats/', (req, res) => {
//   getAllSongs(data => {
//     res.json(data);
//   });
// });

// get stats for one song
app.get('/api/stats/:id', (req, res) => {
  cassandraGetSong(req.params.id, data => res.json(data));
});

// updates stats for one song
app.patch('/api/stats/:id', (req, res) => {
  req.body = req.body.body
  let id = parseInt(req.params.id)
  let dataToUpdate = {};
  if (req.body.plays) { dataToUpdate.plays = parseInt(req.body.plays) };
  if (req.body.likes) { dataToUpdate.likes = parseInt(req.body.likes) };
  if (req.body.reposts) { dataToUpdate.reposts = parseInt(req.body.reposts) };
  cassandraUpdateSongs(id, dataToUpdate, data => res.status(204).end())
});

// delete stats for one song
app.delete('/api/stats/:id', (req, res) => {
  cassandraDeleteSong(parseInt(req.params.id), () => res.status(204).end());  
});



app.listen(port, () => console.log(`Listening to port ${port}...`));