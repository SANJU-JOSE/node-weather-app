const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'https://api.weatherstack.com/current?access_key=c4db403fb7ff9314eaf8d063373cb4ec&query=' +
    long +
    ',' +
    lat;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find your weather location', undefined);
    } else {
      callback(
        undefined,
        ` It is ${response.body.current.weather_descriptions[0]} the temperature outside is ${response.body.current.temperature}oC but it feels like ${response.body.current.feelslike} oC. The humidity is ${response.body.current.humidity} `
      );
    }
  });
};

module.exports = forecast;
