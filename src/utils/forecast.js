const request = require('request');
const forecast =(latitude, longitude,callback)=>
{
  const forecast_url="https://api.weatherapi.com/v1/current.json?key=189d51213ac9493fb8f53641210106&q="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"&aqi=no&lang=en"
  request({url:forecast_url,json:true},(error,{body})=>{
  if(error)
  {console.log("Unable to connect to Weatherapi",undefined)}
  else if(body.error){
    console.log("Unable to Find Location",undefined)
  }
  else{
    const temp_c = body.current.temp_c
       const rain = body.current.precip_mm
    callback(undefined,"It is currently " + temp_c + "c out there.There's currently " + rain + "% chances of rain")
  }
})
}
module.exports=forecast
