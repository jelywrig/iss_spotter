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

module.exports = {
  fetchMyIP,
  fetchCoordinatesByIP
};