//Create the map object
var mymap = L.map('mapid',{
  center:[22.9142, 93.6750],
  zoom: 2

});

//Add a tile layer to the map object
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

//Store USGS endpoint
info= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

//Bring in the data
d3.json(info,function(data) {

var features = data.features
console.log(features)


//Loop through the data
for (i=0; i<features.length; i++){
//setting the data location property to a variable
  var coordinates = data.features[i].geometry.coordinates.slice(1)
  var name = data.features[i].properties.place
  var depth = data.features[i].geometry.coordinates[2]
  var mag = data.features[i].properties.mag
  // console.log(depth)


// console.log(name)
//Check for coordinates property
if(coordinates){
 var marker = L.marker([coordinates[0],coordinates[1]])
 .addTo(mymap)
 marker.bindPopup("Depth"+depth+"|"+name+"|"+"Magnitude"+mag)
}
}
})

