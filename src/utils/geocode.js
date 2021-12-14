

// LONG VERSION NOT REUSABLE 

/*const geolocationURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Brussels.json?access_token=pk.eyJ1IjoiYnJpZ2lsZXRzIiwiYSI6ImNrd3o0ZXp4czB1eWoydWxhdjhnaWNjYnoifQ.RDgRIA37u8UrSOJofRFnug";
request({ url: geolocationURL, json: true}, (error,response)=>{
    if(error){
        console.log('Unable to connect to location services')
    }else if(response.body.features.length === 0){
        console.log('Unable to fin your location')
    }else{
const latitude = response.body.features[0].center[0];
    const longtitude = response.body.features[0].center[1];
    //console.log(response.bodyfeatures[0].center[1]+', '+response.body.features[0].center[0]);
    console.log(longtitude, latitude);
    }

})*/
const request = require('request');

const geocode = (address, callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYnJpZ2lsZXRzIiwiYSI6ImNrd3o0ZXp4czB1eWoydWxhdjhnaWNjYnoifQ.RDgRIA37u8UrSOJofRFnug&limit=1';
//url can be just url as names are matching
request({url:url, json: true}, (error,{ body }) => {
    if(error){
        callback('Unable to connect to location services.', undefined)
    }else if(body.features.length === 0 ){
        callback('Unable to find location, try another search.', undefined)
    } else{
        callback(undefined, {
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
})
}

//allows us to use the geocode in other pages 
module.exports = geocode
