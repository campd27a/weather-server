const request = require('request')

/*const url='https://api.darksky.net/forecast/e68450b05bc11eb4b65cb9e06ca8edba/-37.8141,144.9632?units=si'

request({url: url, json:true},(error, response)=>
{
    if (error)
    {
        console.log('Unable to connect to weather service')
    } else if(response.body.error)
    {
        console.log('Unable to find location')
    } else
    {
        console.log('It is currently '+response.body.currently.temperature+' There is a '+response.body.currently.precipProbability+'% chance of rain.')
        console.log(' '+response.body.daily.data[0].summary)
    }
})
*/

const forecast=(latitude, longitude,callback) =>{
    const url='https://api.darksky.net/forecast/e68450b05bc11eb4b65cb9e06ca8edba/'+latitude+','+longitude+'?units=si'

    request({url, json: true},(error, {body})=>{
        if (error)
        {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error)
        {
            callback('Unable to find location')
        } else
        {
            callback(undefined,body.daily.data[0].summary+'. The high for today is '+body.daily.data[0].temperatureHigh+' and the minimum will be '+body.daily.data[0].temperatureLow+'. It is currently '+body.currently.temperature+' There is a '+body.currently.precipProbability+'% chance of rain. Wind speed is '+body.currently.windSpeed+' and UV index is '+body.currently.uvIndex)
        }

    })
}


module.exports=forecast