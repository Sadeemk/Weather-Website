const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Sadeem Khan'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Sadeem Khan'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'HELP MEEEEE',
		title: 'Help',
		name: 'Sadeem Khan'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}
	const address = req.query.address;
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location: location,
				address: address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found!',
		name: 'Sadeem Khan'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found!',
		name: 'Sadeem Khan'
	});
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
