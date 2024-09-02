const request = require('request');

const geoCode = (address, callback) => {
  const urlG = `https://api.maptiler.com/geocoding/${address}.json?key=gahUQ6NdFu9nRErQiRkn`;

  request({ url: urlG, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (response.body.features.length == 0) {
      callback('Unable to find current location', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].geometry.coordinates[0],
        longitude: response.body.features[0].geometry.coordinates[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
