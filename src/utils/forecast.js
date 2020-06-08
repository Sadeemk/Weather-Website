const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=61c3a8a36dddf08fbeb84633b1339fc2&query=${latitude},${longitude}&units=f`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location! Try another search', undefined);
		} else {
			callback(
				undefined,
				`It is ${body.current.weather_descriptions[0]}. It is currently ${body.current
					.temperature} degrees outside. It feels like ${body.current.feelslike} degrees.`
			);
		}
	});
};

module.exports = forecast;
