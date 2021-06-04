const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

//Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup HandleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Himank Suiwala'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Himank Suiwala'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  }={}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'Philadelphia',
  //   address:req.query.address
  // })
})

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search Term'
    })
  }
  console.log(req.query.search)
  res.send({
    product: 'It ',

  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Himank Suiwala',
    errorMessage: 'Help article Not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Himank Suiwala',
    errorMessage: 'Page Not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
