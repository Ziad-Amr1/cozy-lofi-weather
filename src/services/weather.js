const request = require('request');

const weather = (coords, callback) => {
    const weatherapi = process.env.WEATHER_API;
    const url = weatherapi + coords;
    console.log(url);
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather service.", undefined);
        } else if (response.body.error) {
            callback(response.body.error.message, undefined);
        } else {
            console.log(response.body);
            callback(undefined, getWeather(response));
        } 
    });
}

const getWeather = (response) => {
    // console.log(response.body);
    const weather = response.body.current.condition.text.toLowerCase();
    const city = response.body.location.name;
    const lon = response.body.location.lon;
    const lat = response.body.location.lat;
    const country = response.body.location.country;
    const temp_c = response.body.current.temp_c;
    const temp_f = response.body.current.temp_f;
    // const msg = `The weather in ${city} is currently ${weather}. The temperature is ${temp_c} degrees celsius and ${temp_f} degrees fahrenheit. The location is ${lon}, ${lat}, ${country}.`;
    console.log(weather);
    console.log(city);
    console.log(lon);
    console.log(lat);
    console.log(country);
    console.log(temp_c);
    console.log(temp_f);
    return {
        weather,
        city,
        lon,
        lat,
        country,
        temp_c,
        temp_f
    };
};

module.exports = weather