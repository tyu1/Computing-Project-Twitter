var twitter = require('twit')
      _ =   require('lodash');
var util = require('util'),
    async = require('async'),
    CronJob = require('cron').CronJob;
var T = new twitter({
consumer_key: "EUsHG5YwWK8o4PJEN5Bk7Vvxl",
consumer_secret: "787MHn5pagBqKzv6ZBTMvDu99k8CSlzmhLMDJrlOkH9aCDmYsO",
access_token: "2778006524-r86CBqfd33hP9dx5vxgFSnTvX2XMYfwsLFrv0jn",
access_token_secret: "TDgSIQ8mv1b8SPAtgbSKWrFOqK5RPIPjpfYbh5IxW3pvx"
});

var dbName = 'public_tweets';
var public_tweetDB;
var nano = require('nano')('http://115.146.85.249:5984');
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
    processAllPoliticians('LouiseAsherMP');

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

var politicians_part1 = _.union(liberalPoliticians);

var processStatuses = function (tweet, callback) {
      tweet._id = tweet.id_str;
      console.log(tweet.user.id);
     // if(tweet.coordinates != null){
      public_tweetDB.insert(tweet, function(err, body, header){
              if(err){
                console.log(err.message);

              }else{
                console.log(tweet.user.id+' tweet into db');
              }
            });
    // }
    //  getTweets(tweet.user.id);
      
      setTimeout(function(){callback();}, 120000);
}

var writeToDB = function(politician, callback){
 //for(i=1; i<10; i++){
  T.get('search/tweets',
    {q: politician,
      count: 100,
      since_id :  0
      
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
              console.log( politician + ' tweet finish!');
            }
          });
            // Do something crazy!
      }
});
//}

  setTimeout(function(){callback();}, 6000);

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


 