var twitter = require('twit')
      _ =   require('lodash');
var util = require('util'),
    async = require('async'),
    CronJob = require('cron').CronJob;
var T = new twitter({
consumer_key: "h7huU5uebRHvS02clPb3uxA81",
consumer_secret: "K5OXoJUNBjn8SEvoQpKUBgXPBBKRm0uVxShy85Su1qrT96zxDS",
access_token: "2781635886-wIpdti3NnKGPcOLTgqRfZUKwUeH2GpFwehVDf2O",
access_token_secret: "HVieY6G6Ywc4MQtDD1cTwO9HcfhAsH8cWpqA7huwKOYG0"
});

var dbName = 'public_tweets';
var public_tweetDB;
var nano = require('nano')('http://127.0.0.1:5984');
//nano.db.destroy('melbourne', function() {});
public_tweetDB = nano.use(dbName);

nano.db.create(dbName, function(err, body) {
    // specify the database we are going to use
  if(!err) {
    vicDB = nano.use(dbName);    
  } else {
    console.log('create db error=' + err); 
  }
  writeToDB();
   //getTweets(779896202);

});  

//define politicians
var liberalPoliticians = ['LouiseAsherMP','TedBaillieu','RobertClarkMP','PhilipDaviesMP','MatthewGuyMP','DavidHodgettMP',
                          'WendyLovellMP','TerryMulderMP','Vic_Premier','michaelobrienmp','ODonohueMLC','RichPhillipsMLC',
                           'RyanSmithMP','heidivic','NickWakelingMP','KimWellsMP','Mary_Wooldridge'];
var laborPoliticians = ['JacintaAllanMP','DanielAndrewsMP','JBrumby','LilyDAmbrosioMP','LukeDonnellan','johnerenmp','MartinFoleyMP',
                        'DanielleGreenMP','JoeHelper1','JillHennessyMP','SteveHerbertMP','Tim_Holding','HullsRob','NatHutchins',
                        'GavinJennings','JohnLendersMP','JMaddenMP','JamesMerlinoMP','JennyMikakos','maxVmor','LisanevilleMP','wadenoonan',
                        'MartinPakulaMP','timpallas','Bronwyn_Pike','RichardsonFiona','AdemSomyurek','BrianTeeMP','rwynnemp'];
var greenPoliticians = ['GregMLC','ColleenHartland','sueMLC'];
var nationalsPoliticians = ['TimBullMP','HughDelahunty','DDrumMP','RussellNortheMP','JPowellMP','peterryanMP','PeterWalshMP'];
var liberalPoliticians_name = ['Louise Asher MP','Ted Baillieu','Robert Clark MP','Philip Davies MP','Matthew Guy MP','David Hodgett MP',
                          'Wendy Lovell MP','Terry Mulder MP','Denis Napthine','michaelobrienmp','Donohue MLC','Rich Phillips MLC',
                           'Ryan SmithMP','Heidi Victoria MP','Nick Wakeling MP','Kim Wells MP','Mary Wooldridge'];
var laborPoliticians_name = ['Jacinta Allan MP','Daniel Andrews MP','Brumby','Lily DAmbrosio MP','Luke Donnellan','johnerenmp','Martin Foley MP',
                        'Danielle Green MP','Joe Helper','Jill Hennessy MP','Steve Herbert MP','Tim Holding','Hulls Rob','Nat Hutchins',
                        'Gavin Jennings','John Lenders MP','Madden MP','James Merlino MP','Jenny Mikakos','max Vmor','Lisa neville','wade noonan',
                        'Martin Pakula MP','tim pallas','Bronwyn Pike','Richardson Fiona','Adem Somyurek','Brian Tee MP','Richard Wynne'];
var greenPoliticians_name = ['Greg MLC','Colleen Hartland','Sue Pennicuik'];
var nationalsPoliticians_name = ['Tim Bull MP','Hugh Delahunty','Damian Drum','Russell Northe MP','Jeanette Powell MP','peterryan MP','Peter Walsh MP'];


var politicians = _.union(
  liberalPoliticians,
  laborPoliticians,
   greenPoliticians, 
   nationalsPoliticians,
   liberalPoliticians_name,
   laborPoliticians_name,
   greenPoliticians_name,
   nationalsPoliticians_name
 
);


//define distance
if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

getDistance = function(start, end, decimals) {
    //console.log('getDistance');
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


//get tweets streaming
var victoria1 = ['140.98','-39.22','143.45','-34.11']
var writeToDB = function(){
 var stream = T.stream('statuses/filter', { locations: victoria1})
  stream.on('tweet', function(tweet){
    console.log(tweet.text);
    var item = tweet.text.toString().toLowerCase(); 
      for(i =0; i<politicians.length; i++){
        if(item.indexOf(politicians[i].toLowerCase()) > -1){
          tweet._id = tweet.id_str;
          public_tweetDB.insert(tweet, function(err, body, header){
           if(err){
              console.log("err "+err.message);
            }else{
              console.log(tweet.id +' tweets have inserted to db');
            }
          
          });
              getTweets(tweet.user.id);
           
       }
     }
  });
}

// var melbourneLocaiton = new Object();
// melbourneLocaiton.latitude= -37.8136
// melbourneLocaiton.longitude=  144.9631


//get tweets by id 
var getTweets = function(id){
  for (i = 1; i <= 16; i++) {
    T.get('statuses/user_timeline', {
      user_id: id,
      count: 200,
      page: i
    }, function(err1, tweets) {
      console.log('get tweets for:', id );
      if (err1) {
        console.log('err1=' + err1);
        console.log('id=' + id);
      } else {
        _.each(tweets, function(tweet) {
          for(i = 0; i< politicians.length; i++){
          if(tweet.text.toString().toLowerCase().indexOf(politicians[i].toLowerCase())>-1){
           // console.log(item.coordinates.coordinates);
          //  var location = new Object();
           

          //  if(tweet.coordinates != null && tweet.coordinates != 'null'){
          //   location.latitude = tweet.coordinates.coordinates[1];
          //   location.longitude = tweet.coordinates.coordinates[0];
          //   // console.log('location=' + location);
          //   var distance = getDistance(location, melbourneLocaiton, 2);
          //  // console.log('distance=' + distance);
          // }else{
          //   var distance  = 1000;

          // }
            
          // if(tweet.user.time_zone.toLowerCase() === 'melbourne'  || distance < 350 || tweet.user.location.toLowerCase() === 'melbourne' || tweet.user.location.toLowerCase() === 'victoria'){
              tweet._id = tweet.id_str;
              public_tweetDB.insert(tweet, function(err, body, header) {
                if (err) {
                  console.log('[insert] ', err.message);
                  console.log('id=' +id);
                } else {
                  console.log('====================');
                  console.log(id + ' tweets insert');
                  console.log('====================');
                }

              });
         //}
        }
      }
    });
  }
});
}
}






 