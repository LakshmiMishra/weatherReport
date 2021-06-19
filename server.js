const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const appid="a83305c97e6c26252d14fe0e8eea16cd";
  const cName=req.body.cityName;
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cName+"&appid="+appid+"&unit="+unit;
https.get(url,function(response){
  response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const cityTemp=weatherData.main.temp;
      const imageId=weatherData.weather[0].icon;
      const imageUrl="https://openweathermap.org/img/wn/"+imageId+"@2x.png";
      res.write("<html><body>")
      res.write("<h1>The Temperature in "+cName+" is "+cityTemp +"</h1>")
      res.write("<img src="+imageUrl+"</>");
      res.write("</body></html>")
      res.send();
      });
    });
});
app.listen(3000,function(){
  console.log("Server started at 3000");
})
