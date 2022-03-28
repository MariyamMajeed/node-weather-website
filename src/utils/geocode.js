const request=require('postman-request')
const geocode=(address,callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFyaXlhbWJpIiwiYSI6ImNsMTBoZXdsYTEwc3YzZG8weWt0Mngwa3AifQ.h3xpQW2nGygfMgeLnK4MfA&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect tot the service',undefined)
        }else if(body.features.length===0){
            callback('Location not found',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0], 
                location:body.features[0].place_name
            })

        }
    })



}

module.exports=geocode