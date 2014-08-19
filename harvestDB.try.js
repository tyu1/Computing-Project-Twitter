var twitter = require('twit'),
  _ = require('lodash'),
  sleep = require('sleep'),
  async = require('async');

var T = new twitter({
  consumer_key: "O5DDzLfQJBnmaUVwmy69irD52",
  consumer_secret: "35uoTYTzOrvmwIYWAadilrAUrugYIfs20ZGDtFRcWFUVnY4Gop",
  access_token: "2725430768-Zf83AmBnMi7AZKhe2HycZkPPHT41lhNttGHH0d2",
  access_token_secret: "9SDibQ5eKzCFDglhxM0qrNP2zn149lL5fHr1xquWdofiz"
});


var dbName = 'politicians';
var tweetDB;
var nano = require('nano')('http://127.0.0.1:5984');
//nano.db.destroy(dbName, function() {});

var liberalPoliticians = ['TonyAbbottMHR'];
var laborPoliticians = ['Mark_Arbib'];
var greenPoliticians = ['AdamBandt'];
var nationalsPoliticians = ['GChristensenMP'];
var familyPoliticians = ['senatorsteve'];
var independentPoliticians = ['OakeyMP'];
var politicians = _.union(
  liberalPoliticians,
  laborPoliticians
  // greenPoliticians, 
  // nationalsPoliticians, 
  // familyPoliticians, 
  // independentPoliticians
);


tweetDB = nano.use(dbName);

nano.db.create(dbName, function(err, body) {
  // specify the database we are going to use
  if (!err) {
    tweetDB = nano.use(dbName);
  } else {
    console.log('create db error=' + err);
  }
  processAllPoliticians(politicians);
});


var writeToDB = function(screenName, callback) {
  console.log('this function is called', screenName);
  for (i = 1; i <= 2; i++) {
    T.get('statuses/user_timeline', {
      screen_name: screenName,
      count: 5,
      page: i
    }, function(err1, tweets) {
      console.log('get tweets for:', screenName);
      if (err1) {
        console.log('err1=' + err1);
        console.log('screenName=' + screenName);
      } else {
        _.each(tweets, function(tweet) {
          if (tweet.coordinates != null && tweet.coordinates != 'null') {
            console.log('Tweet without coordinates info:', tweet);
          }
          tweet._id = tweet.id_str;
          tweetDB.insert(tweet, function(err, body, header) {
            if (err) {
              console.log('[insert] ', err.message);
              console.log('screenName=' + screenName);
            } else {
              // console.log('you have inserted the tweet');
              // console.log('screenName=' + screenName);
            }

          });
        });
      }
    });
  }
  sleep.sleep(8);
  callback();
};

var processAllPoliticians = function(politicians) {
  async.eachSeries(politicians, writeToDB(politician, callback), function(err) {
      console.log('some error occurred');
    } else {
      console.log('All good, done!');
    }
  });
};