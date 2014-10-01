var twitter = require('twit')
      _ =   require('lodash');
var util = require('util'),
    async = require('async'),
    CronJob = require('cron').CronJob;
var T = new twitter({
consumer_key: "O5DDzLfQJBnmaUVwmy69irD52",
consumer_secret: "35uoTYTzOrvmwIYWAadilrAUrugYIfs20ZGDtFRcWFUVnY4Gop",
access_token: "2725430768-Zf83AmBnMi7AZKhe2HycZkPPHT41lhNttGHH0d2",
access_token_secret: "9SDibQ5eKzCFDglhxM0qrNP2zn149lL5fHr1xquWdofiz"
});

var dbName = 'public_tweets';
var public_tweetDB;
var nano = require('nano')('http://127.0.0.1:5984');
//nano.db.destroy('melbourne', function() {});
public_tweetDB = nano.use(dbName);

  nano.db.create(dbName, function(err, body) {
    // specify the database we are going to use
    if(!err) {
      public_tweetDB = nano.use(dbName);    
    } else {
       console.log('create db error=' + err); 
    }
    //writeToDB('melbourne');
    processAllPoliticians(politicians_part3);

  });  

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
                        'Martin Pakula MP','timp allas','Bronwyn Pike','Richardson Fiona','Adem Somyurek','Brian Tee MP','Richard Wynne'];
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
var politicians_part3 = _.union(
   greenPoliticians, 
   nationalsPoliticians,
   liberalPoliticians_name);


var processStatuses = function (tweet, callback) {
      tweet._id = tweet.id_str;
      console.log(tweet.user.id);
      public_tweetDB.insert(tweet, function(err, body, header){
              if(err){
                console.log(err.message);

              }else{
                console.log(tweet.user.id+' tweet into db');
              }
            });
      getTweets(tweet.user.id);
      
      setTimeout(function(){callback();}, 120000);
}

var writeToDB = function(politician, callback){
 //for(i=1; i<10; i++){
  T.get('search/tweets',
    {q: politician,
      count: 100
      
     },
    function(err1, items){
      //console.log(items);
          if(err1){
          console.log('err1'+ err1);
          } else{
            async.eachSeries(items.statuses, processStatuses, function(err) {
            if (err){
              console.log('some error occurred');
            } else {
              console.log('All good, done!');
            }
          });
            // Do something crazy!
      }
});
//}

  setTimeout(function(){callback();}, 12000000);

}

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


var processAllPoliticians = function(politicians) {
  async.eachSeries(politicians, writeToDB, function(err) {
      if (err){
        console.log('some error occurred');
      } else {
        console.log('All good, done!');
      }
  });
};


 