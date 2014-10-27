
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var politician = require('./routes/politician');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/list', politician.list);
app.get('/politicians', politician.list);
app.get('/partyDistro', politician.partyDistro);
app.get('/tweetsCounts', politician.tweetsCounts);
app.get('/friendsCounts', politician.friendsCounts);
app.get('/retweetCounts', politician.retweetCounts);
app.get('/politicians/:politicianId', politician.show);
app.get('/followedBy', politician.followedBy);
app.get('/tweetHourReport',politician.tweetHourReport);
app.get('/frequentWordsByName',politician.frequentWordsByName);
app.get('/hashtagsByName',politician.hashtagsByName);
app.get('/mentionedPeopleByName',politician.mentionedPeopleByName);
app.get('/tweetHourByNameReport',politician.tweetHourByNameReport);
app.get('/tweetSentimentByKeyword',politician.tweetSentimentByKeyword);
app.get('/geoLocation',politician.geoLocation);
app.get('/partyTweetTime', politician.partyTweetTime);
app.get('/partySentiment', politician.partySentiment);
app.get('/partyRetweetCount', politician.partyRetweetCount);
app.get('/publicRetweetCountPerson', politician.publicRetweetCountPerson);
app.get('/retweetTimeZoneParty', politician.retweetTimeZoneParty);
app.get('/partySourceDistro', politician.partySourceDistro);
app.get('/tweetDistro',politician.tweetDistro);
app.get('/partyFollowerCount', politician.partyFollowerCount);
app.get('/partyTweetTimeDay', politician.partyTweetTimeDay);
app.get('/publicPartyTweetTime', politician.publicPartyTweetTime);
app.get('/publicTweetSource', politician.publicTweetSource);
app.get('/publicTweetsSentiment', politician.publicTweetsSentiment);
app.get('/publicTweetsSentimentTimeChange', politician.publicTweetsSentimentTimeChange);
app.get('/coordinatesSentiment', politician.coordinatesSentiment);
app.get('/individualTweetsSentiment', politician.individualTweetsSentiment);
app.get('/tweetSentimentByKeywordAndPolitician',politician.tweetSentimentByKeywordAndPolitician);
app.get('/tweetSentimentOverview',politician.tweetSentimentOverview);
app.get('/sentimentRanking',politician.sentimentRanking);


app.param('politicianId', politician.politician);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
