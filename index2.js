const {
  nextISSTimesForMyLocation
} = require('./iss_promised');


nextISSTimesForMyLocation()
  .then(data => {
    for (let eachPass of data) {
      console.log(`Next pass at ${Date(eachPass.risetime).toString()} for ${eachPass.duration} seconds!`)
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });