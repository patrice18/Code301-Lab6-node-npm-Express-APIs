//below means that variables have to be first declared before anything can be assigned them
'use strict'

//creating an express application to interact with node.js for back end functionality. We are telling node to get/acces express API.
let express = require('express');
let app = express (); //creating the variable app, and giving it the value of the invoked express function. Now I have access to the Express module, meaning that I have an instance of the Express API and therefore I can call its methods on this page. 

// reuiring superagent libraby to be able to make Xhttp request to thirs party API's
let superagent = require('superagent');

//import cors to handle cross origin request
let cors = require('cors');
//invoking the method cors
app.use(cors());

//requiring the dotenv module and invoking the config method allowing us to add environment variables 
   require('dotenv').config()

//checking if my route is working, when i send a request will i get a response.
app.get('/',(request,response) => {
    response.send('this route is working')
})

// creating a PORT for my server to listen to 
let PORT = process.env.PORT  || 3000;



//sending the request to access the third API, and getting the API response to us the client
app.get('/location', (request,response) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=Port-au-Prince&key=${process.env.GEOCODE_API_KEY}`
    superagent.get(url)
    .then(res => response.send({
        latitude: res.body.results[0].geometry.location.lat,
        longitude: res.body.results[0].geometry.location.lng
      }))
      .catch(err => response.send('<img src="http://http.cat/404" />'))
      
  })
  
//   function handleError(err){
//     return ({error:err, messaage: 'something broke!!'})
//   }

//access a PORT
app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
    console.log(process.env.GEOCODE_API_KEY)
})
// .catch(err)

//sending request to the weather third party API, to get me the response of the weather in PAP. 
app.get('/weather',(request,response)=>{
    let url1= `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/18.594395,-72.3074326`
    superagent.get(url1)
    .then(res => response.send({
        hourly: res.body.hourly.summary,
        daily: res.body.daily.summary,
      }))
})