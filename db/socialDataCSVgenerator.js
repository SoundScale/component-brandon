const fs = require('fs');
// const csv = require('fast-csv'); // currently unused
const faker = require('faker');

let getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

let nameString = `id, name, plays, songs`;
faker.seed(13579);

const addOneMillion = (i) => {
  if (i > 9) {
    return;
  }
  let nameString = ''
  if (i === 0){
    nameString += `id, name, plays, likes, reposts${'\n'}`;
  }
  for (let j = 1; j <= 1000000; j += 1) {
    nameString += `${j + (1000000 * i)},${faker.commerce.color()} ${faker.hacker.noun()} ${j + (1000000 * i)}, ${getRandomInt(100000) + 1}, ${getRandomInt(100000) + 1}, ${getRandomInt(100000) + 1}${'\n'}`;
  }
  fs.appendFile('./songswithsocialdatawithheader.csv', nameString, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    addOneMillion(i + 1);
  });
};

addOneMillion(0);