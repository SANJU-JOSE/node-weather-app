const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Sanju Jose',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather app',
    name: 'Sanju Jose',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather app',
    name: 'Sanju Jose',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'must provide search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Weather app',
    name: 'Sanju Jose',
    errorMessage: 'Article not found',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: 'Weather app',
    name: 'Sanju Jose',
    errorMessage: 'Page not found',
  });
});
app.listen(port, () => {
  console.log('server in port ' + port);
});
