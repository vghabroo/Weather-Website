
const express = require("express");

const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){
  //console.log(req.body.cityName);
  //console.log("Post received");
  //since the url is so long, we store it in a variable called url
  const query = req.body.cityName;
  const apiKey = "9cff0a77efa536f91fbbcc7361e3f1dc";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&appid=" + apiKey + "&units=" + unit;
  //res is different from response variable; response get request from api
  https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
       const weatherData = JSON.parse(data);
       //console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

       //console.log(weatherDescription);
      // console.log(temp);
      res.write("<p>The weather is currently " + weatherDescription + "<p>.");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius </h1>");
      res.write("<p>The weather is currently " + weatherDescription + "<p>.");
      res.write("<img src = " + imageURL + " >");
      res.send()


       //const object = {
        // name: "Vishakha",
         //favouritefood: "KFC"
      // }
      // console.log(JSON.stringify(object));
     })
  });
});


app.listen(3000, function(){
  console.log("Server 3000 is running");
});
