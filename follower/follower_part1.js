var twitter = require('twit')
      _ =   require('lodash');
var util = require('util'),
    async = require('async');
var T = new twitter({
consumer_key: "pnqYPjgt48oSPhSRpBHmLkZRp",
consumer_secret: "8KLwKHJQDggCAumOx5PyBhz3xiYTl6Jx7UUbMMtcrGyPDOM32Y",
access_token: "2781671024-d1V4SIBbzAQON8RJ7mThnQoHwyvX12BcWpxCOXZ",
access_token_secret: "gkUwATyYUr3fbYvKaCcsHozRWPboOUMkDYCxWgS5myy2t"

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
  process(process_group);
});

if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

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

var process_group = ['JBrumby', 'Vic_Premier'];






var getAllFollowerID = function(politician, callback){
  T.get('followers/ids', { screen_name: politician },  function (err, data, response) {
      if(err){
        console.log(err.message);
      } else{
        console.log(data);
        //var time = data.ids.length;
        async.eachSeries(data.ids, getTweets, function(err){
          if(err){
            console.log('err');

          }else{
           // console.log('all done!')
          }
          

        })
      }
   });
  setTimeout(function(){callback();}, 601000000 )
}

var melbourneLocaiton = new Object();
melbourneLocaiton.latitude=  -37.8136
melbourneLocaiton.longitude=  144.9631

var getTweets = function(id, callback){
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
                console.log('there is');
              //console.log(item.coordinates.coordinates);
                var location = new Object();
                if(tweet.coordinates != null && tweet.coordinates != 'null'){
                  location.latitude = tweet.coordinates.coordinates[1];
                  location.longitude = tweet.coordinates.coordinates[0];
                  // console.log('location=' + location);
                  var distance = getDistance(location, melbourneLocaiton, 2);
                  // console.log('distance=' + distance);
                }else{
                  var distance  = 1000;
                }
                if((tweet.user.time_zone != null && tweet.user.time_zone.toLowerCase() === 'melbourne')  || 
                   (tweet.user.location != null && tweet.user.location.toLowerCase() === 'melbourne') ||
                   (tweet.user.location != null && tweet.user.location.toLowerCase() === 'melbourne australia') ||
                   (tweet.user.location != null && tweet.user.location.toLowerCase() === 'victoria')  ||
                    distance < 350){
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
                }
              }
            }
          });
        }
      });
    }
  setTimeout(function(){callback();}, 120000);
}

var process = function(politicians){
  async.eachSeries(politicians, getAllFollowerID, function(err){
    if(err){
      console.log(err.message);
    }else{
      console.log('All done!');
    }
  })
}