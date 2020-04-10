const {nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = (response) => {
  for(let pass of response) {
    const date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }  
};


nextISSTimesForMyLocation()
.then(response => {
  printPassTimes(response);
})
.catch(error => {
  console.log("It didn't work", error.message);
});