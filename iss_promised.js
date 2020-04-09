// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  return request(`https://ipvigilante.com/${JSON.parse(body).ip}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP };