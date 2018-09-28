# Social Area

Optimize the backend for a component on the soundcloud page. 

## Related Projects

    FEC Related Projects
  - https://github.com/SoundCloud-Front-End-Capstone/relatedLists
  - https://github.com/SoundCloud-Front-End-Capstone/waveform-player
  - https://github.com/SoundCloud-Front-End-Capstone/comments
  - https://github.com/SoundCloud-Front-End-Capstone/SocialArea
    
    SDC Related Projects
  - https://github.com/SoundScale/component-jverch-comments
  - https://github.com/SoundScale/proxy-rebecca
  - https://github.com/SoundScale/component-rebecca-relatedLists
  - https://github.com/SoundScale/component-brandon-socialArea
  - https://github.com/SoundScale/proxy-brandon
  - https://github.com/SoundScale/proxy-jverch
  - https://github.com/SoundScale/component-avincenthill-waveform
  - https://github.com/SoundScale/proxy-avincenthill

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
  #### API Usage
  
  ##### GET SOCIAL AREA DATA FOR ALL TRACKS 

  Endpoint 
  GET .../api/stats/

  - On success, the HTTP status code in the response header is 200 OK and the response body contains an array of objects, with each object representing a song.

  - Each song object has an id, plays, likes and reposts.  

  Example Data
  [
    {
        "_id": "5baabe947707de1ea0f10019",
        "id": 3,
        "plays": 7729,
        "likes": 80,
        "reposts": 309,
        "__v": 0
    },
    {
        "_id": "5baabe947707de1ea0f1001a",
        "id": 4,
        "plays": 3957,
        "likes": 845,
        "reposts": 316,
        "__v": 0
    }
  ]
  
  ##### GET SOCIAL AREA DATA FOR A SINGLE SONG

  Endpoint 
  GET .../api/stats/:id

  Path Parameters
  - id (int) - the id related to the track being queried
    
  - On success, the HTTP status code in the response header is 200 OK and the response body contains an array with a single object, with the object representing the song.

  - The song object with have an id, plays, likes and reposts.  

  Example Data
  [
    {
        "_id": "5baabe947707de1ea0f10019",
        "id": 3,
        "plays": 7729,
        "likes": 80,
        "reposts": 309,
        "__v": 0
    }
  ]

  ##### CREATE SOCIAL AREA DATA FOR A SINGLE SONG

  Endpoint 
  POST .../api/stats/

  Request Body
  - name (String) - the name of the song being added. If not included included, name will default to 'Name not specified' 
  - plays (Int) - the number of plays for the song being added. If not included, plays will default to 0.
  - likes (Int) - the number of likes for the song being added. If not included, likes will default to 0.
  - reposts (Int) - the number of reposts for the song being added. If not included, reposts will default to 0.

  Example Response Body
  {
    name: 'God Only Knows- Remastered',
    plays: 15,
    likes: 1238,
    reposts: 13,
  }

  - On success, the HTTP status code in the response header is 201 OK and the response body will be a single object, with the object representing the song added.

  - The song object with have an id, plays, likes and reposts.  

  Example Data
  {
      "_id": "5babc3d4dbeb80008c56ed61",
      "id": 117,
      "name": "Name not specified",
      "plays": 0,
      "likes": 0,
      "reposts": 0,
      "__v": 0
  }

  ##### UPDATE SOCIAL AREA DATA FOR A SINGLE SONG

  Endpoint 
  PATCH .../api/stats/:id

  Path Parameters
  - id (int) - the id related to the track being updated

  Request Body
  - plays (Int) - the number of plays for the song to be updated to. If not included, plays will not be updated.
  - likes (Int) - the number of likes for the song being added. If not included, likes will not be updated.
  - reposts (Int) - the number of reposts for the song being added. If not included, reposts will not be updated.

  Example Response Body
  {
    plays: 15,
    likes: 1238,
    reposts: 13,
  }

  - On success, the HTTP status code in the response header is 204 OK. 

  ##### DELETE SOCIAL AREA DATA FOR A SINGLE SONG
  
  Endpoint 
  delete .../api/stats/:id

  Path Parameters
  - id (int) - the id related to the track being updated

  - On success, the HTTP status code in the response header is 204 OK. 







## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
