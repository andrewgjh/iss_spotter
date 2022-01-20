const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsBYIP = (ip, callback) => {

  request(`https://api.freegeoip.app/json/${ip}?apikey=434de870-7a3c-11ec-a56a-0ff266bcf0e4`, (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const {
        latitude,
        longitude
      } = JSON.parse(body);
      callback(null, {
        latitude,
        longitude
      });
    }
  });
}

const fetchISSFlyOverTimes = (coordinates, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${String(coordinates.latitude)}&lon=${String(coordinates.longitude)}`, (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const passes = JSON.parse(body).response
      callback(null, passes);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, myIP) => {
    if (err) {
      console.log(err);
      return;
    }
    fetchCoordsBYIP(myIP, (err, geoObj) => {
      if (err) {
        console.log(err);
        return;
      }
     
      fetchISSFlyOverTimes(geoObj, (err, passes) => {
        if (err) {
          console.log(err);
          return;
        }
        callback(null,passes);
      })
    })
  })
};

module.exports = {
  fetchMyIP,
  fetchCoordsBYIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};