
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

/*
//storing url for weather api
const url = 'http://api.weatherstack.com/current?access_key=935f0c0b1bede52f0fcc02bb03eee739&query=50.8467,4.3547&units=m';

request({ url: url, json: true },(error, response)=>{
 //   json: true  parses the data for us no need for the code bellow 
//const data = JSON.parse(response.body);
//console.log(data.current);
//console.log(response.body.current)

//Printing small forecast to the user 
//const temperature = response.body.current.temperature;
//const feelslike = response.body.current.feelslike;
if(error){
    console.log('Unable to connect to weather service!');
} else if(response.body.error){
 console.log('Unable to find location');
} else{console.log(response.body.current.weather_descriptions[0] +'. It is currently '+response.body.current.temperature+' degrees out. It feels like '+ response.body.current.feelslike + ' degrees out.')
}
})
*/
const request = require('request')
const forecast = (latitude,longitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=935f0c0b1bede52f0fcc02bb03eee739&query='+latitude+','+longitude+'&units=m';
    //"http://api.weatherstack.com/current?access_key=935f0c0b1bede52f0fcc02bb03eee739&query=New%York";
//destructuring response into part of it which we use: body
request({url:url, json: true}, (error,{ body })=>{
   
    if(error){
        callback('Unable to connect to weather service!', undefined)
    } else if(body.error){
        callback('Unable to find location',undefined)
    }else{//forecastData
        callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature+' degrees out. It feels like '+ body.current.feelslike + ' degrees out.')
    }
})
}

module.exports = forecast;