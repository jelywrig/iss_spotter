//const {fetchMyIP, fetchCoordinatesByIP, fetchISSFlyOverTimes} = require('./iss');

// fetchMyIP((err, ip) => {
//   if(err) {
//     console.log('ERROR:', err);
//     return;
//   }
  
//   console.log('IP:', ip);

// });



// fetchCoordinatesByIP('70.79.171.158', (err, coordinates) => {
//   if (err) {
//     console.log('ERROR:', err);
//     return;
//   }
//   console.log(coordinates);

// })

//{ latitude: '49.17000', longitude: '-123.13680' }

// fetchISSFlyOverTimes({ latitude: '49.17000', longitude: '-123.13680' }, (err, results) => {
//   if (err) {
//     console.log('ERROR:', err);
//     return;
//   }
//   for(const pass of results) {
//     console.log(pass);
//   }

// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});