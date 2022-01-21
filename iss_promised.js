const request = require('request-promise-native');
const { fetchCoordsBYIP } = require('./iss');

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
}

const fetchCoordsByIP = function (body) {
  let ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=434de870-7a3c-11ec-a56a-0ff266bcf0e4`)
};

const fetchISSFlyOverTimes = function (body) {
  const {
    latitude,
    longitude
  } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
}