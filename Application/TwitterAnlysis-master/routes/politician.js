/*
 * GET users listing.
 */

var dbName = 'polit_info';

var nano = require('nano')('http://115.146.85.249:5984');
var politicianInfoDB = nano.use(dbName);
var politicians = [];
var natural = require('natural'),
    tokenizer = new natural.WordTokenizer(),
    _ = require('lodash');

var liberalPoliticians = ['TonyAbbottMHR', 'SenatorAbetz', 'JohnAlexanderMP', 'KarenAndrewsMP', 'senatorback', 'bobbaldwinmp', 'GuyBarnett', 'corybernardi', 'Birmo',
    'JulieBishopMP', 'SenatorSue', 'BriggsJamie', 'SenatorBushby', 'steveciobo', 'richardmcolbeck', 'helencoonan', 'MathiasCormann', 'PeterDutton_MP', 'pilbaraboy', 'paulwfletcher',
    'JoshFrydenberg', 'JoGash', 'NatashaGriggsMP', 'AlexHawkeMP', 'JoeHockey', 'garyhumphries', 'GregHuntMP', 'SteveIronsMP', 'DennisJensenMP', 'EwenforHerbert', 'Craig4Hughes',
    'AndrewLamingMP', 'sussanley', 'LouiseMarkusMP', 'RussellMatheson', 'ScottMorrisonMP', 'KellyODwyer', 'AndrewRobbMP', 'stuartrobertmp', 'Wyatt_Roy_MP', 'patrickseckermp',
    'TonySmithMP', 'asouthcottmp', 'SharmanStone', 'DanTehanWannon', 'AlanTudgeMP', 'TurnbullMalcolm', 'BertVanManen', 'KenWyattMP', 'kevinandrewsmp', 'BruceBillsonMP', 'greghuntmp', 'michaelkeenanmp'
];

var laborPoliticians = ['Mark_Arbib', 'SharonBirdMP', 'Bowenchris',  'Tony_Burke', 'NickChampionMP', 'JasonClareMP', 'trishcrossin', 'KateEllisMP', 'fitzhunter',
    'stevegeorganas', 'JuliaGillard', 'JillHallMP', 'edhusicMP', 'stephenjonesALP', 'MikeKellyMP', 'CatherineKingMP', 'KateLundy', 'RobMitchellMP',
    'ShayneNeumannMP', 'Deborah_ONeill', 'JulieOwensMP', 'Louise_Pratt', 'bernieripollmp', 'AmandaRishworth', 'JanelleSaffin', 'SenNickSherry', 'billshortenmp', 'ursulastephens',
    'DobellThommo', 'KelvinThomsonMP', 'MrKRudd','DBradbury1021','pgarrett',  'SteveGibbonsXMP'
];

var greenPoliticians = ['AdamBandt', 'BobBrownFndn', 'sarahinthesen8', 'SenatorLudlam', 'senatormilne', 'SenatorSiewert'];

var nationalsPoliticians = ['GChristensenMP', 'Barnaby_Joyce', 'SenatorWacka', 'DarrenChesterMP', 'M_McCormackMP'];

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


exports.partyTweetTime = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician');
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

exports.partyRetweetCount = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
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

exports.retweetTimeZoneParty = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician');
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
exports.partySourceDistro = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician');
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
exports.tweetDistro = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
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
exports.partyTweetTimeDay = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
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

exports.publicRetweetCountPerson = function (req, res) {
    var params = {descending: true};
    var politicianDB = nano.use('politician');
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


//exports.following = function (req, res) {
//    //console.log('screen_name=' + req.query.screen_name + ' party=' + req.query.party);
//    var screenName = req.query.screen_name;
//    var params = {key: [screenName, req.query.party]};
//    var politicianRelationshipDB = nano.use('politician_relationship');
//    politicianRelationshipDB.view('analysis', 'following', params, function (err, body) {
//        var followers = [];
//        if (!err) {
//
//            var name = findImage(screenName, req.query.party);
//            followers.push([name, '', req.query.party]);
//            body.rows.forEach(function (doc) {
//                var follower = doc.value[0];
//                var followerName = findImage(follower, req.query.party);
//                followers.push([followerName, screenName, doc.value[1]]);
//            });
//            //console.log(followers);
//            res.send(200, followers);
//        } else {
//            console.log(err);
//            res.send(200, []);
//        }
//    });
//};


exports.weekdayReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'ActivenessDuringWeek', params, function (err, body) {
        var weekdays = [];
        if (!err) {
            weekdays = body.rows;

            //console.log(weekdays);


            res.send(200, weekdays);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetSourceReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'tweet_source', params, function (err, body) {
        var tweetSource = [];
        if (!err) {
            tweetSource = body.rows;

            res.send(200, tweetSource);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetHourReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
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

exports.tweetHourByNameReport = function (req, res) {
    var screenName = req.query.screen_name;
    var params = {group_level: 2, startkey: [screenName, 0],  endkey: [screenName, 23]};
    var politicianDB = nano.use('politician');
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


exports.frequentWordsByName = function (req, res) {

    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician');
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
//            _.each(sortedWordsMap, function (count, word) {
//
//            });

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



exports.hashtagsByName = function (req, res) {

    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician');
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
//            _.each(sortedWordsMap, function (count, word) {
//
//            });

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



exports.mentionedPeopleByName = function (req, res) {

    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {

//            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
//                '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on'];
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
//                if(value > 1) {
//                   // list.push({name: key, size: value});
//                    list.push(key);
//                    n++;
//                }

//                if (n % 2 == 0) {
//                    m++;
//                    list0.push({name: 'group' + m, children: list});
//                    console.log(list);
//                    list = [];
//                }
                if (i == 500) {
                    break;
                }
            }
//            _.each(sortedWordsMap, function (count, word) {
//
//            });

            console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetSentiment2ByKeyword = function (req, res) {
    var keyword = req.query.keyword;
   // var params = {group_level: 1};
    var politicianDB = nano.use('politician');


    politicianDB.view('analysis', 'tweets_sentiment', function (err, body) {

        var positive = {};
        var negative = {};
        var list = [];
        if (!err) {

            body.rows.forEach(function (doc) {
                //console.log(doc);
                if(doc.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    var year = doc.value[1];
                    var screenName = doc.value[0];
                    list.push([doc.key, year, screenName]);
                }
            });

            natural.BayesClassifier.load('classifier1.json', null, function(err, classifier) {
                _.each(list, function(text){

                    var party = '';
                    var temp = _.find(liberalPoliticians, function (key) {
                        return (key.toLowerCase() === text[2].toLowerCase());
                    });
                    if (temp != undefined) {
                        party = 'liberal';
                    }

                    if(party ==='') {
                        temp = undefined;
                        temp = _.find(laborPoliticians, function (key) {
                            return (key.toLowerCase() === text[2].toLowerCase());
                        });
                        if (temp != undefined) {
                            party = 'labor';
                        }
                    }




                    if(party ==='') {
                        temp = undefined;
                        temp = _.find(greenPoliticians, function (key) {
                            return (key.toLowerCase() === text[2].toLowerCase());
                        });
                        if (temp != undefined) {
                            party = 'green';
                        }

                    }

                    if(party ==='') {
                        temp = undefined;
                        temp = _.find(greenPoliticians, function (key) {
                            return (key.toLowerCase() === text[2].toLowerCase());
                        });
                        if (temp != undefined) {
                            party = 'nationals';
                        }
                    }
                   // console.log('party=' + party);
                    if (party != '') {

                        if(classifier.classify(text[0]) == 1 ) {
                           // console.log('party=' + party);
                            var yearExists = false;
                            _.find(positive, function (value, key) {
                               // console.log("key=" + key + " year=" + text[1]);
                                if (key === text[1]) {
                                    yearExists = true;
                                }

                            });
                            if(yearExists) {
                                positive[text[1]][party] += 1;

                            } else {
                                positive[text[1]] = {'liberal': 0, 'labor': 0, 'green':0, 'nationals': 0};
                                positive[text[1]][party] += 1;

                            }

                        } else {
                            var yearExists = false;
                            _.find(negative, function (value, key) {
                                if (key === text[1])
                                     yearExists = true;
                            });
                            if(yearExists) {
                                negative[text[1]][party] += 1;
                                //console.log("negative +1=" + text[1]);
                            } else {
                                negative[text[1]] = {'liberal': 0, 'labor': 0, 'green':0, 'nationals': 0};
                                negative[text[1]][party] += 1;
                                //console.log("new 1=" + text[1]);
                            }
                        }
                    }

                });
                console.log({positive:positive, negative: negative});
                res.send(200, {positive:positive, negative: negative});
            });
            //console.log(list);

        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.partySentiment = function (req, res) {
    var params = {group_level: 2};
    var politicianDB = nano.use('politician');
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



exports.tweetSentimentByKeyword = function (req, res) {
    var keyword = req.query.keyword;

    var politicianDB = nano.use('politician');

    var params = {group_level: 1};
    politicianDB.view('analysis', 'tweet_sentiment', function (err, body) {

        var liberal_positiveNum = 0;
        var liberal_negativeNum = 0;

        var labor_positiveNum = 0;
        var labor_negativeNum = 0;

        var green_positiveNum = 0;
        var green_negativeNum = 0;

        var nationals_positiveNum = 0;
        var nationals_negativeNum = 0;

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


        if (!err) {

            body.rows.forEach(function (doc) {
                //console.log(doc);
                if(doc.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    //console.log(doc.value);
                    //
                    categories.forEach(function (year) {
                        if(doc.value[1]!=null && doc.value[1].toLowerCase() == "liberal" && doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]==1)
                            {
                                positive_data_groupbyYear[year]["liberal"] += 1;
                            }
                            else
                            {
                                negative_data_groupbyYear[year]["liberal"] += 1;
                            }
                        }
                        else if(doc.value[1]!=null && doc.value[1].toLowerCase() == "labor"&& doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]==1)
                            {
                                positive_data_groupbyYear[year]["labor"] += 1;
                            }
                            else
                            {
                                negative_data_groupbyYear[year]["labor"] += 1;
                            }
                        }
                        else if(doc.value[1]!=null && doc.value[1].toLowerCase() == "green"&& doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]==1)
                            {
                                positive_data_groupbyYear[year]["green"] += 1;
                            }
                            else
                            {
                                negative_data_groupbyYear[year]["green"] += 1;
                            }
                        }
                        else if(doc.value[1]!=null && doc.value[1].toLowerCase() == "nationals"&& doc.value[2].split(" ")[5]==year)
                        {
                            if(doc.value[0]==1)
                            {
                                positive_data_groupbyYear[year]["nationals"] += 1;
                            }
                            else
                            {
                                negative_data_groupbyYear[year]["nationals"] += 1;
                            }
                        }
                        
                    });
                    
                }
            });
            
            var positive_series = [];
            var negative_series = [];

            var party_array = ["liberal", "labor", "green", "nationals"];
            party_array.forEach(function (party_name) {
                var dataPositive_forParty = [];
                var dataNegative_forParty = [];
                categories.forEach(function (year) {
                    dataPositive_forParty.push(positive_data_groupbyYear[year][party_name]);
                    dataNegative_forParty.push(negative_data_groupbyYear[year][party_name]);
                });
                positive_series.push({name:party_name, data: dataPositive_forParty});
                negative_series.push({name:party_name, data: dataNegative_forParty});
            });

            res.send(200, {categories:categories,positive_series:positive_series,negative_series:negative_series});

        } else {
            console.log(err);
        }
    });
};




exports.geoLocation = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
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


/**
 * Show an politician
 */
exports.show = function (req, res) {
    res.send(201, {politician: req.politician});
};
