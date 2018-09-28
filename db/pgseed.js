const { Client } = require('pg');
const connectionString = 'postgresql://postgres:Lucky888@localhost:5432/SoundScale';

const client = new Client({
  connectionString: connectionString,
})
client.connect().then(() => console.log('connected'))

client.query(`DROP TABLE IF EXISTS songs, social;`)
  .then(client.query(
    `CREATE TABLE songs(
      ID SERIAL,
      NAME VARCHAR (255) NOT NULL, 
      PLAYS INT NOT NULL,
      LIKES INT NOT NULL,
      REPOSTS INT NOT NULL,
      PRIMARY KEY (ID))`
  ))
  .then(() => console.log("Completed Creating Tables"));
