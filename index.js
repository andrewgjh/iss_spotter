const {
  nextISSTimesForMyLocation
} = require('./iss');



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for(let eachPass of passTimes){
    console.log(`Next pass at ${Date(eachPass.risetime).toString()} for ${eachPass.duration} seconds!`)
  }
});