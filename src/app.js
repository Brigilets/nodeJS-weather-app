const path = require('path')

const express = require('express')

const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
//req = request
//res = response
//res.send('...') Text that will be shown to user upon opening the page

//customizing the server
//app.use(express.static(path.join(__dirname,'../public')))
//ADD ALL THE FILE IN PUBLIC FOLDERs

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebars and views location
app.set('view engine', 'hbs');//set up handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//index.hbs
app.get('', (req,res)=> {
    //using index as we don't need to use the extension
    res.render('index', {
        title:'Weather',
        name:'Brigita Sabutyte'
    })
})

//about.hbs
app.get('/about', (req,res)=>{
    //setting up about.hbs instead of about.html
    // we leave 1st argument blank in app.get only for index page as otherwise we need to add extension that will be used
    res.render('about', {
    title:'About Me',
    name: 'Brigita Sabutyte'
    })
})

//help.hbs
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'If you need help, you came to the right place',
        name: 'Brigita Sabutyte'

    })
})

/*Replaced by express.static
app.get('',(req,res)=>{
 res.send('<h1>Weather</h1>')//sending HTML data
})
app.get('/help',(req,res)=>{//sending JSON data
    res.send([{
        name: 'Brigita'},
       { name: 'Lidia'
    }])
})
app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})*/
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Address is required!"
        })
    }
//'{latitude, longitude,location}={}' allows to display the error message instead of crashing application
    geocode(req.query.address, (error, {latitude, longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
      return res.send({
          error: "You must provide a search term"
      })
    }
   console.log(req.query.search)
 res.send({
     products: []
 })
})
//error request for matching pattern (/help/*)
app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404 Help',
        name: 'Brigita Sabutyte',
        errorMessage:'Help article not found'
    })
})
// setting up error page 404 
//* selects all
app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Brigita Sabutyte',
        errorMessage: 'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on server '+port)
})