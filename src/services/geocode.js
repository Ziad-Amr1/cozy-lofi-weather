const request = require('request');

const getCoordinates = (city, callback) => {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const url = geocodeurl + city + ".json?" + process.env.GEO_CODE_TOKEN;
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to the geocode service.", undefined);
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if (response.body.features.length == 0) {
            callback("Error: you have entered an invalid city name", undefined);
        } else {
            const longitude = response.body.features[0].center[0];
            const latitude = response.body.features[0].center[1];
            let coords = longitude + "," + latitude;
            callback(undefined, coords);
        } 
    });
}

module.exports = getCoordinates