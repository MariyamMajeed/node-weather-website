const request = require('postman-request')
const forecast =(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0018b27518a28e4c8975c270eb834d08&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else {
            callback(undefined,body.current.weather_descriptions[0]+ '. It is currently ' + body.current.temperature + ' degrees out and it feels like '+body.current.feelslike+' degree. There is '+ body.current.precip+'% chance of rain!'
                // weather_description:body.current.weather_descriptions[0],
                // temperature:body.current.temperature,
                // feels_like:body.current.feelslike
            )
        }
    })
}

module.exports=forecast