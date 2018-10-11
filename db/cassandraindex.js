const cassandra = require('cassandra-driver');
// const client = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'soundscale' });
const client = new cassandra.Client({ contactPoints: ['ec2-52-53-171-108.us-west-1.compute.amazonaws.com'], keyspace: 'soundscale' });

// helper hash function for new songs
hashFunction = (string) => {
  var hash = 0;
  if (string.length == 0) {
      return hash;
  }
  for (var i = 0; i < string.length; i++) {
      var char = string.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// creates a new song
const cassandraPostSong = (postObj, callback) => {
  const { name, plays, likes, reposts } = postObj;
  const indexHash = hashFunction(name);
  const query = `INSERT INTO songs (id, name, plays, likes, reposts) VALUES(${indexHash},'${name}', ${plays}, ${likes}, ${reposts});`;

  client.execute(query)
  .then(result => callback(result))
  .catch(err => console.log(err))
  
};

// gets stats for a single song
const cassandraGetSong = (id, callback) => {
  client.execute(`SELECT * FROM songs WHERE id = ${id}`)
  .then(result => callback(result.rows[0]))
  .catch(err => console.log(err))
};

const cassandraUpdateSongs = (id, data, callback) => {
  
  let setString = []

  for (let key in data){
    setString.push(`${key}=${data[key]}`) 
  }

  setString = setString.join(',');

  const query = `UPDATE songs
  SET ${setString}
  WHERE id=${id}`

  client.execute(query)
  .then(result => callback())
  .catch(err => console.log(err))
}

// delete stats for a single song
const cassandraDeleteSong = (id, callback) => {
  const query = `DELETE FROM songs WHERE id=${id};`
  
  client.execute(query)
  .then(result => callback())
  .catch(err => console.log(err))
}

module.exports = {
  cassandraGetSong: cassandraGetSong,
  cassandraPostSong: cassandraPostSong,
  cassandraDeleteSong: cassandraDeleteSong,
  cassandraUpdateSongs: cassandraUpdateSongs
}