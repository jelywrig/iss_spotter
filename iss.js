const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`returned a status code of ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
    
  });
};

const fetchCoordinatesByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`returned a status code of ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const bodyJSON = JSON.parse(body);
    const data = {
      latitude: bodyJSON.data.latitude,
      longitude: bodyJSON.data.longitude
    };
    callback(null, data);
  });

  

};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`returned a status code of ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    let result = JSON.parse(body).response;
    callback(null, result);
  });
};
//http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON

module.exports = {
  fetchMyIP,
  fetchCoordinatesByIP,
  fetchISSFlyOverTimes
};