var _ = require('underscore');
var util = require('util'),
    twitter = require('twitter'),
    CronJob = require('cron').CronJob;
var twit = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

var dbName = 'melbourne';
var melbourneDB;
var nano = require('nano')('http://127.0.0.1:5984');
//nano.db.destroy('melbourne', function() {});
melbourneDB = nano.use(dbName);

  nano.db.create(dbName, function(err, body) {
    // specify the database we are going to use
    if(!err) {
      melbourneDB = nano.use(dbName);    
    } else {
       console.log('create db error=' + err); 
    }

  });  

/** Converts numeric degrees to radians */
if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}
 
// start and end are objects with latitude and longitude
//decimals (default 2) is number of decimals in the output
//return is distance in kilometers. 
getDistance = function(start, end, decimals) {
    console.log('getDistance');
    decimals = decimals || 2;
    var earthRadius = 6371; // km
    lat1 = parseFloat(start.latitude);
    lat2 = parseFloat(end.latitude);
    lon1 = parseFloat(start.longitude);
    lon2 = parseFloat(end.longitude);
 
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();
 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
};



 




// twit.stream('statuses/sample', function(stream) {
//     stream.on('data', function(data) {
//         console.log(util.inspect(data));
//     _.each(data.statuses, function (item) {
//      melbourneDB.insert(item,  function(err, body, header) {
//       if (err) {
//         console.log('[insert] ', err.message);
//         //return;
//       }
//       console.log('you have inserted the tweet')
//       console.log(body);
        
//     });
// });

var melbourneLocaiton = new Object();
melbourneLocaiton.latitude = -37.8136
melbourneLocaiton.longitude = 144.9631

function getData() {


twit.search('melbourne OR #melbourne', function(data) {
    //console.log(data);
	//console.log(data.statuses);
    _.each(data.statuses, function (item) {
        console.log(item.coordinates);
        if(item.coordinates != null && item.coordinates != 'null'){
            console.log(item.coordinates.coordinates);
            var location = new Object();
            location.latitude = item.coordinates.coordinates[1];
            location.longitude = item.coordinates.coordinates[0];
            console.log('location=' + location);
            var distance = getDistance(location, melbourneLocaiton, 2)
            console.log('distance=' + distance);
            if (distance < 50) {
                item._id = item.id_str;
               melbourneDB.insert(item,  function(err, body, header) {      
           
          
              if (err) {
                console.log('[insert] ', err.message);
              } else {
                 console.log('you have inserted the tweet') 
              }                
         
              });


    	}
     
     }
    });
    
});

}
 //getData();

var job = new CronJob('00,20,50 * * * * *', function(){
    getData();
    console.log('You see this message at ' + new Date().toDateString() + " " + new Date().toTimeString());
}, function(){
    console.log('stops');
}, true, 'Australia/Melbourne');

//job.start();

 