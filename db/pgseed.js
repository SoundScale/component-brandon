const { Client } = require('pg');
const connectionString = 'postgresql://postgres:postgres@localhost:5432/soundscale';

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


  
// COPY songs FROM '/home/brandon/Projects/Javascript/component-brandon-socialArea/db/songswithsocialdatawithheader.csv' DELIMITER ',' CSV HEADER; 
  // select * from songs where id=15;
  // select * from songs where id=1000005;
  // select * from songs where id=2000005;
  // select * from songs where id=3000006;
  // select * from songs where id=4000007;
  // select * from songs where id=5000008;
  // select * from songs where id=6000009;
  // select * from songs where id=7000043;
  // select * from songs where id=8000002;
  // select * from songs where id=9000003;
  // select * from songs where id=10000034;


// select * from songs where name='mint green protocol 1';
// select * from songs where name='silver circuit 1000000';
// select * from songs where name='black monitor 2000000';
// select * from songs where name='black transmitter 3000000';
// select * from songs where name='cyan protocol 4000000';
// select * from songs where name='orange capacitor 5000000';
// select * from songs where name='gold alarm 6000000';
// select * from songs where name='mint green bandwidth 7000000';
// select * from songs where name='violet sensor 8000000';
// select * from songs where name='violet sensor 9000000';
// select * from songs where name='violet pixel 10000000';