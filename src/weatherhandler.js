const weather = require("./services/weather");
const getCoordinates = require("./services/geocode");

const sendWeatherResponse = (res, weatherData) => {
  res.send({
    success: true,
    country: weatherData.country,
    city: weatherData.city,
    forecast: weatherData.weather,
    temp_c: weatherData.temp_c,
    temp_f: weatherData.temp_f,
    lon: weatherData.lon,
    lat: weatherData.lat,
  });
};

const weatherHandler = (req, res) => {
  //   console.log(req.query);
  const city = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (!city && (!lat || !lon)) {
    return res.send({
      success: false,
      error: "you must provided a city name or a latitude and longitude",
    });
  }

  if (city) {
    const weatherData = getCoordinates(city, (error, data) => {
      if (error) {
        return res.send({ success: false, error });
      }
      weather(data, (error, weatherData) => {
        if (error) {
          return res.send({ success: false, error });
        }
        sendWeatherResponse(res, weatherData);
        // console.log(weatherData);
      });
    });
  }

  if (lat && lon) {
    let coords = lat + "," + lon;
    weather(coords, (error, weatherData) => {
      if (error) {
        return res.send({ success: false, error });
      }
      sendWeatherResponse(res, weatherData);
      // console.log(weatherData);
    });
  }
};

module.exports = weatherHandler;
