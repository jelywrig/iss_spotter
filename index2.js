const {fetchMyIP} = require('./iss_promised');


fetchMyIP()
.then((result) => console.log(result));