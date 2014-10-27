/*
 * GET users listing.
 */

var dbName = 'polit_info';

var nano = require('nano')('http://115.146.85.249:5984');
var politicianInfoDB = nano.use(dbName);
var politicians = [];
var natural = require('natural'),
    tokenizer = new natural.WordTokenizer(),
    _ = require('underscore');

var liberalPoliticians = ['LouiseAsherMP','TedBaillieu','RobertClarkMP','PhilipDaviesMP','MatthewGuyMP','DavidHodgettMP',
                          'WendyLovellMP','TerryMulderMP','Vic_Premier','michaelobrienmp','ODonohueMLC','RichPhillipsMLC',
                           'RyanSmithMP','heidivic','NickWakelingMP','KimWellsMP','Mary_Wooldridge'];
var laborPoliticians = ['JacintaAllanMP','DanielAndrewsMP','JBrumby','LilyDAmbrosioMP','LukeDonnellan','johnerenmp','MartinFoleyMP',
                        'DanielleGreenMP','JoeHelper1','JillHennessyMP','SteveHerbertMP','Tim_Holding','HullsRob','NatHutchins',
                        'GavinJennings','JohnLendersMP','JMaddenMP','JamesMerlinoMP','JennyMikakos','maxVmor','LisanevilleMP','wadenoonan',
                        'MartinPakulaMP','timpallas','Bronwyn_Pike','RichardsonFiona','AdemSomyurek','BrianTeeMP','rwynnemp'];
var greenPoliticians = ['GregMLC','ColleenHartland','sueMLC'];
var nationalsPoliticians = ['TimBullMP','HughDelahunty','DDrumMP','RussellNortheMP','JPowellMP','peterryanMP','PeterWalshMP'];

exports.list = function (req, res) {
    var params = {include_docs: true};
    politicianInfoDB.list(params, function (err, body) {
        if (!err) {
            console.log(body.rows.length);
            body.rows.forEach(function (doc) {
                if (doc.doc._id != '_design/analysis') {
                    politicians.push(doc.doc);
                }
            });
        } else {
            console.log(err);
        }
        res.send(200, {politicians: politicians});
    });
};
exports.followerCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'followers_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
exports.partyDistro = function (req, res) {
    var params = {group_level: 1};
    politicianInfoDB.view('analysis', 'party_distro', params, function (err, body) {
        var parties = [];
        if (!err) {
            parties = body.rows;

            console.log(parties);

            res.send(200, parties);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetsCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'tweets_count', params, function (err, body) {
        var politicians = [];
        if (!err) {
            politicians = body.rows;

            console.log(politicians);
            var slicedFollows = politicians.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.friendsCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'friends_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.retweetCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'retweet_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.politician = function (req, res, next, id) {
    console.log('id=' + id);
    politicianInfoDB.get(id, function (err, body) {

        if (err) return next(err);
        if (!body) return next(new Error('Failed to load politician ' + id));
        req.politician = body;
        next();

    });
};


function findImage(screenName, party) {
    if (politicians.length == 0) {
        var params = {include_docs: true};
        politicianInfoDB.list(params, function (err, body) {
            if (!err) {
                console.log(body.rows.length);
                body.rows.forEach(function (doc) {
                    if (doc.doc._id != '_design/analysis') {
                        politicians.push(doc.doc);
                    }

                });

            } else {
                console.log(err);
            }
        });
    }
    for (var i = 0; i < politicians.length; i++) {
        if (screenName == politicians[i].screen_name) {
            var polName = politicians[i].name;
            if (party != politicians[i].party) {
                polName = '<div style="color:red">' + politicians[i].name + '</div>';
            }
            return {v: politicians[i].screen_name, f: polName + '<div><img src="' + politicians[i].profile_image_url + '"></div>'};
        }
    }

};

exports.followedBy = function (req, res) {
    //console.log('screen_name=' + req.query.screen_name + ' party=' + req.query.party);
    var screenName = req.query.screen_name;
    var params = {key: [screenName, req.query.party]};
    var politicianRelationshipDB = nano.use('poli_relation');
    politicianRelationshipDB.view('analysis', 'followed_by', params, function (err, body) {
        var followers = [];
        if (!err) {

            var name = findImage(screenName, req.query.party);
            followers.push([name, '', req.query.party]);
            body.rows.forEach(function (doc) {
                var follower = doc.value[0];
                var followerName = findImage(follower, req.query.party);
                followers.push([followerName, screenName, doc.value[1]]);
            });
            //console.log(followers);
            res.send(200, followers);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.partyFollowerCount = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician_relation');
    politicianDB.view('analysis', 'party_follower_count', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
//********************************************politician tweets****************************************************
//mentioned people 
exports.mentionedPeopleByName = function (req, res) {

    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician_tweets');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {
            natural.LancasterStemmer.attach();
            var mentionRegexp = /@([a-zA-Z0-9]+)/g;
            body.rows.forEach(function (doc) {
                var temp = doc.value.match(mentionRegexp);
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {

                    if (word.toLowerCase() in wordsMap) {
                        wordsMap[word.toLowerCase()] += 1;
                    } else {
                        wordsMap[word.toLowerCase()] = 1;
                    }


                });

            });

            console.log('wordsMap=' + wordsMap);
            var n = 0, m = 0;
            var list0 = [];
            var list = [];

            var tuples = [];

            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);

            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];

                return a < b ? 1 : (a > b ? -1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];
                list.push(key);

                if (i == 500) {
                    break;
                }
            }


            console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//frequent word
exports.frequentWordsByName = function (req, res) {

    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician_tweets');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {
            //console.log('body.rows=' + body.rows);
            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
            '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on'];
            natural.LancasterStemmer.attach();
            body.rows.forEach(function (doc) {
                var temp = doc.value.tokenizeAndStem();
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {
                    if (!_.contains(stopWords, word.toLowerCase())) {
                        if (word.toLowerCase() in wordsMap) {
                            wordsMap[word.toLowerCase()] += 1;
                        } else {
                            wordsMap[word.toLowerCase()] = 1;
                        }
                    }

                });

            });

            //console.log('wordsMap=' + wordsMap);
            var n = 0, m = 0;
            var list0 = [];
            var list = [];

            var tuples = [];

            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);

            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];

                return a < b ? 1 : (a > b ? -1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];
                if(value > 1) {
                    list.push({name: key, size: value});
                    n++;
                }

                if (n % 10 == 0) {
                    m++;
                    list0.push({name: 'group' + m, children: list});
                    console.log(list);
                    list = [];
                }
                if (i == 200) {
                    break;
                }
            }


            console.log(list0);
            if(list0.length == 0) {
                res.send(200, []);
            } else {
                res.send(200, {name: 'flare', children: list0});
            }
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//frequent hashtags
exports.hashtagsByName = function (req, res) {

    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician_tweets');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {

            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
                '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on'];
            natural.LancasterStemmer.attach();
            var hashtagRegexp = /#([a-zA-Z0-9]+)/g;
            body.rows.forEach(function (doc) {
                var temp = doc.value.match(hashtagRegexp);
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {

                        if (word.toLowerCase() in wordsMap) {
                            wordsMap[word.toLowerCase()] += 1;
                        } else {
                            wordsMap[word.toLowerCase()] = 1;
                        }


                });

            });

            //console.log('wordsMap=' + wordsMap);
            var n = 0, m = 0;
            var list0 = [];
            var list = [];

            var tuples = [];

            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);

            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];

                return a < b ? 1 : (a > b ? -1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];
                if(value > 1) {
                    list.push({name: key, size: value});
                    n++;
                }

                if (n % 2 == 0) {
                    m++;
                    list0.push({name: 'group' + m, children: list});
                    console.log(list);
                    list = [];
                }
                if (i == 1000) {
                    break;
                }
            }

            console.log(list0);
            if(list0.length == 0) {
                res.send(200, []);
            } else {
                res.send(200, {name: 'flare', children: list0});
            }

        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

//tweet sentiment overview for all politician
exports.tweetSentimentOverview = function (req, res) {

    var politicianDB = nano.use('politician_tweets');

    politicianDB.view('analysis', 'tweet_sentiment', function (err, body) {
        if (!err) {
            var categories =["2009","2010","2011","2012","2013","2014"];

            var positive_counts_array = {"2009": 0, "2010": 0, "2011":0, "2012": 0, "2013": 0, "2014": 0};
            var negative_counts_array = {"2009": 0, "2010": 0, "2011":0, "2012": 0, "2013": 0, "2014": 0};
            var neutral_counts_array = {"2009": 0, "2010": 0, "2011":0, "2012": 0, "2013": 0, "2014": 0};
            body.rows.forEach(function (doc) {
                
                    if(doc.value[0] == 'positive' && categories.indexOf(doc.value[2].split(" ")[5]) > -1)
                    {
                            positive_counts_array[doc.value[2].split(" ")[5]] ++;
                    }
                    if(doc.value[0] == 'negative' && categories.indexOf(doc.value[2].split(" ")[5]) > -1)
                    {
                        negative_counts_array[doc.value[2].split(" ")[5]] ++;
                    }
                    if(doc.value[0] == 'neutral' && categories.indexOf(doc.value[2].split(" ")[5]) > -1)
                    {
                        neutral_counts_array[doc.value[2].split(" ")[5]] ++;
                    }
                
            });

            var positive_series = [];
            var negative_series = [];
            var neutral_series = [];

            for(var positive_counts_obj in positive_counts_array) {
              positive_series.push(positive_counts_array[positive_counts_obj]);
            }

            for(var negative_counts_obj in negative_counts_array) {
              negative_series.push(negative_counts_array[negative_counts_obj]);
            }
             for(var neutral_counts_obj in neutral_counts_array) {
              neutral_series.push(neutral_counts_array[neutral_counts_obj]);
            }

            var final_series_data = [{name: 'Positive',data: positive_series},{name: 'Negative',data: negative_series},
            {name: 'neutral',data: neutral_series}];

            
            res.send(200, {categories:categories,final_series_data:final_series_data});
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//tweet sentiment for each politician by key word
exports.tweetSentimentByKeywordAndPolitician = function (req, res) {
    var keyword = req.query.keyword;
    var politician_screen_name = req.query.screenName;

    var politicianDB = nano.use('politician_tweets');

    var params = {startkey: [politician_screen_name], endkey:[politician_screen_name,{}]};


    politicianDB.view('analysis', 'tweets_sentiment_by_name', params, function (err, body) {
        if (!err) {
            var categories =["2009","2010","2011","2012","2013","2014"];

            var positive_counts_array = {"2009": 0, "2010": 0, "2011":0, "2012": 0, "2013": 0, "2014": 0};
            var negative_counts_array = {"2009": 0, "2010": 0, "2011":0, "2012": 0, "2013": 0, "2014": 0};
             var neutral_counts_array = {"2009": 0, "2010": 0, "2011":0, "2012": 0, "2013": 0, "2014": 0};

            body.rows.forEach(function (doc) {
                
                if(doc.value[1].toLowerCase().indexOf(keyword.toLowerCase()) > -1) {

                    if(doc.value[0] == 'positive' && categories.indexOf(doc.value[2].split(" ")[5]) > -1)
                    {
                        positive_counts_array[doc.value[2].split(" ")[5]] ++;
                    }
                    if(doc.value[0] ==  'negative' && categories.indexOf(doc.value[2].split(" ")[5]) > -1)
                    {
                        negative_counts_array[doc.value[2].split(" ")[5]] ++;
                    }
                    if(doc.value[0] ==  'neutral' && categories.indexOf(doc.value[2].split(" ")[5]) > -1)
                    {
                        neutral_counts_array[doc.value[2].split(" ")[5]] ++;
                    }
                
                }
            });

            var positive_series = [];
            var negative_series = [];
            var neutral_series = [];

            for(var positive_counts_obj in positive_counts_array) {
              positive_series.push(positive_counts_array[positive_counts_obj]);
            }

            for(var negative_counts_obj in negative_counts_array) {
              negative_series.push(negative_counts_array[negative_counts_obj]);
            }
            for(var neutral_counts_obj in neutral_counts_array) {
              neutral_series.push(neutral_counts_array[neutral_counts_obj]);
            }

            var final_series_data = [{name: 'Positive',data: positive_series},{name: 'Negative',data: negative_series},
            {name: 'Neutral',data: neutral_series}];

            
            res.send(200, {categories:categories,final_series_data:final_series_data});
        } else {
            console.log(err);
        }
    });
};
//tweet semtiment by keyword
exports.tweetSentimentByKeyword = function (req, res) {
    var keyword = req.query.keyword;

    var politicianDB = nano.use('politician_tweets');

    var params = {group_level: 1};
    politicianDB.view('analysis', 'tweet_sentiment', function (err, body) {

        var liberal_positiveNum = 0;
        var liberal_negativeNum = 0;
        var liberal_neutralNum = 0;

        var labor_positiveNum = 0;
        var labor_negativeNum = 0;
        var labor_neutralNum = 0;

        var green_positiveNum = 0;
        var green_negativeNum = 0;
        var green_neutralNum = 0;

        var nationals_positiveNum = 0;
        var nationals_negativeNum = 0;
        var nationals_neutralNum = 0;

        var categories =["2009","2010","2011","2012","2013","2014"];
        var positive_data_groupbyYear = {"2009":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2010":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2011":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2012":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2013":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2014":{"liberal": 0, "labor": 0, "green":0, "nationals": 0}
                                };

        var negative_data_groupbyYear = {"2009":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2010":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2011":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2012":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2013":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2014":{"liberal": 0, "labor": 0, "green":0, "nationals": 0}
                                };
         var neutral_data_groupbyYear = {"2009":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2010":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2011":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2012":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2013":{"liberal": 0, "labor": 0, "green":0, "nationals": 0},
                                "2014":{"liberal": 0, "labor": 0, "green":0, "nationals": 0}
                                };


        if (!err) {

            body.rows.forEach(function (doc) {
                //console.log(doc);
                if(doc.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    //console.log(doc.value);
                    //
                    categories.forEach(function (year) {
                        if(doc.value[1]!=null && doc.value[1].toLowerCase() == "liberal" && doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]== 'positive')
                            {
                                positive_data_groupbyYear[year]["liberal"] += 1;
                            }
                            if(doc.value[0] == 'negative')
                            {
                                negative_data_groupbyYear[year]["liberal"] += 1;
                            }
                            if(doc.value[0] == 'neutral'){
                                neutral_data_groupbyYear[year]["liberal"] += 1;
                            }
                        }
                        else if(doc.value[1]!=null && doc.value[1].toLowerCase() == "labor"&& doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]== 'positive')
                            {
                                positive_data_groupbyYear[year]["labor"] += 1;
                            }
                            if(doc.value[0] == 'negative')
                            {
                                negative_data_groupbyYear[year]["labor"] += 1;
                            }
                            if(doc.value[0]== 'neutral'){
                                neutral_data_groupbyYear[year]["labor"] += 1;
                            }
                        }
                        else if(doc.value[1]!=null && doc.value[1].toLowerCase() == "green"&& doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]=='positive')
                            {
                                positive_data_groupbyYear[year]["green"] += 1;
                            }
                            if(doc.value[0] == 'negative')
                            {
                                negative_data_groupbyYear[year]["green"] += 1;
                            }
                            if(doc.value[0] == 'neutral')
                            {
                                neutral_data_groupbyYear[year]["green"] += 1;
                            }
                        }
                        else if(doc.value[1]!=null && doc.value[1].toLowerCase() == "nationals"&& doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]=='positive')
                            {
                                positive_data_groupbyYear[year]["nationals"] += 1;
                            }
                            if(doc.value[0] == 'negative')
                            {
                                negative_data_groupbyYear[year]["nationals"] += 1;
                            }
                            if(doc.value[0] == 'neutral' ){
                                neutral_data_groupbyYear[year]["nationals"] += 1;
                            }
                        }
                        
                    });
                    
                }
            });
            
            var positive_series = [];
            var negative_series = [];
            var neutral_series = [];

            var party_array = ["liberal", "labor", "green", "nationals"];
            party_array.forEach(function (party_name) {
                var dataPositive_forParty = [];
                var dataNegative_forParty = [];
                var dataNeutral_forParty = [];
                categories.forEach(function (year) {
                    dataPositive_forParty.push(positive_data_groupbyYear[year][party_name]);
                    dataNegative_forParty.push(negative_data_groupbyYear[year][party_name]);
                    dataNeutral_forParty.push(negative_data_groupbyYear[year][party_name]);
                });
                positive_series.push({name:party_name, data: dataPositive_forParty});
                negative_series.push({name:party_name, data: dataNegative_forParty});
                neutral_series.push({name:party_name, data: dataNegative_forParty});
            });

            res.send(200, {categories:categories,positive_series:positive_series,negative_series:negative_series,neutral_series:neutral_series});

        } else {
            console.log(err);
        }
    });
};
//party sentiment
exports.partySentiment = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'party_sentiment', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//tweet hour by name 
exports.tweetHourByNameReport = function (req, res) {
    var screenName = req.query.screen_name;
    console.log(screenName);
    var params = {group_level: 2, startkey: [screenName, 0],  endkey: [screenName, 23]};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'tweet_time_by_name', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//tweet hour 
exports.tweetHourReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'tweet_time', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//public retweet count on a person
exports.publicRetweetCountPerson = function (req, res) {
    var params = {descending: true};
    var politicianDB = nano.use('politician_tweets');
        politicianDB.view('analysis', 'public_retweet_count_person', params, function (err, body) {
        var results = [];
        if (!err) {
            results = body.rows;

            console.log(results);
            var slicedFollows = results.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
//party tweet time 
exports.partyTweetTimeDay = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'ActivenessDuringWeek', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
//party tweet time 
exports.partyTweetTime = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'party_tweet_time', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
//tweet source distro
exports.tweetDistro = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'tweet_source', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
//party source distro
exports.partySourceDistro = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'party_source_distro', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
//retweet time zone
exports.retweetTimeZoneParty = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'retweet_time_zone_party', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
//retweet count for each party
exports.partyRetweetCount = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'public_retweet_count_party', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
exports.geoLocation = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'geolocation',  function (err, body) {
        var list = [];
        if (!err) {
            body.rows.forEach(function (doc) {
                list.push({lat:doc.key[0], lng:doc.key[1], content:doc.value});
            });

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
exports.sentimentRanking = function (req, res) {
    var screenName = req.query.screen_name;
    console.log(screenName);
    var params = {group_level: 2, key: [screenName, 'positive'], descending : true};
    var politicianDB = nano.use('politician_tweets');
    politicianDB.view('analysis', 'sentiment_ranking', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

//********************************************public tweets****************************************************


exports.publicPartyTweetTime = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('public');
    politicianDB.view('analysis', 'public_party_tweet_time', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};


exports.coordinatesSentiment = function (req, res) {
    var publicDB = nano.use('public');
    publicDB.view('analysis', 'public_coordinates_sentiment', null, function (err, body) {
        var followers = [];
        if (!err) {
            results = body.rows;

            console.log(results);
            res.send(200, results);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.publicTweetSource = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('public');
    politicianDB.view('analysis', 'public_tweet_source', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};
exports.individualTweetsSentiment = function (req, res) {
    var params = {group_level: 3};
    var politicianDB = nano.use('public');
    politicianDB.view('analysis', 'individual-tweets-sentiment', params, function (err, body) {
        var results = [];
        if (err) {
            console.log("err:", err);
            res.send(200, []);
            return false;
        }
        results = body.rows;
        console.log(results);
        res.send(200, results)
    });
};

exports.publicTweetsSentiment = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('public');
    politicianDB.view('analysis', 'public _party_sentiment', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
exports.publicTweetsSentimentTimeChange = function (req, res) {
    var params = {group_level: 3};
    var politicianDB = nano.use('public');
    politicianDB.view('analysis', 'public_party_counts', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

/**
 * Show an politician
 */
exports.show = function (req, res) {
    res.send(201, {politician: req.politician});
};
