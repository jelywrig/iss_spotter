// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  return request(`https://ipvigilante.com/${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = function (coords) {
  const parsedBody = JSON.parse(coords);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${parsedBody.data.latitude}&lon=${parsedBody.data.longitude}`);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const {response} = JSON.parse(data);
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };