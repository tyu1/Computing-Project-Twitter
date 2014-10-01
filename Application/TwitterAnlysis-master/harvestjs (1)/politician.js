var Twit = require('twit'),

    _ = require('underscore'),
    util = require('util');



var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});


var dbName = 'politician';
var tweetDB;
var nano = require('nano')('http://admin:noot@127.0.0.1:5984');
//nano.db.destroy(dbName, function() {});
tweetDB = nano.use(dbName);

nano.db.create(dbName, function(err, body) {
    // specify the database we are going to use
    if (!err) {
        tweetDB = nano.use(dbName);
    } else {
        console.log('create db error=' + err);
    }

});

// var liberalPoliticians = [
//      'SenatorSue', 'BriggsJamie', 'SenatorBushby', 'steveciobo', 'richardmcolbeck', 'helencoonan', 'MathiasCormann', 'PeterDutton_MP', 'pilbaraboy', 'paulwfletcher',
//     'JoshFrydenberg', 'JoGash', 'NatashaGriggsMP', 'AlexHawkeMP', 'JoeHockey', 'garyhumphries', 'GregHuntMP', 'SteveIronsMP', 'DennisJensenMP', 'EwenforHerbert', 'Craig4Hughes',
//     'AndrewLamingMP', 'sussanley', 'LouiseMarkusMP', 'RussellMatheson', 'ScottMorrisonMP', 'KellyODwyer', 'AndrewRobbMP', 'stuartrobertmp', 'Wyatt_MP', 'patrickseckermp',
//     'TonySmithMP', 'asouthcottmp', 'SharmanStone', 'DanTehanWannon', 'AlanTudgeMP', 'TurnbullMalcolm', 'BertVanManen', 'KenWyattMP', 'kevinandrewsmp', 'BruceBillsonMP', 'greghuntmp', 'michaelkeenanmp'
// ];

var liberalPoliticians = ['TonyAbbottMHR', 'SenatorAbetz', 'JohnAlexanderMP', 'KarenAndrewsMP', 'senatorback', 'bobbaldwinmp', 'GuyBarnett', 'corybernardi', 'Birmo',
    'JulieBishopMP', 'SenatorSue', 'BriggsJamie', 'SenatorBushby', 'steveciobo', 'richardmcolbeck', 'helencoonan', 'MathiasCormann', 'PeterDutton_MP', 'pilbaraboy', 'paulwfletcher',
    'JoshFrydenberg', 'JoGash', 'NatashaGriggsMP', 'AlexHawkeMP', 'JoeHockey', 'garyhumphries', 'GregHuntMP', 'SteveIronsMP', 'DennisJensenMP', 'EwenforHerbert', 'Craig4Hughes',
    'AndrewLamingMP', 'sussanley', 'LouiseMarkusMP', 'RussellMatheson', 'ScottMorrisonMP', 'KellyODwyer', 'AndrewRobbMP', 'stuartrobertmp', 'Wyatt_Roy_MP', 'patrickseckermp',
    'TonySmithMP', 'asouthcottmp', 'SharmanStone', 'DanTehanWannon', 'AlanTudgeMP', 'TurnbullMalcolm', 'BertVanManen', 'KenWyattMP', 'kevinandrewsmp', 'BruceBillsonMP', 'greghuntmp', 'michaelkeenanmp'
];

//DBradbury1021  pgarrett  SteveGibbonsXMP

var laborPoliticians = ['Mark_Arbib', 'SharonBirdMP', 'Bowenchris',  'Tony_Burke', 'NickChampionMP', 'JasonClareMP', 'trishcrossin', 'KateEllisMP', 'fitzhunter',
     'stevegeorganas', 'JuliaGillard', 'JillHallMP', 'edhusicMP', 'stephenjonesALP', 'MikeKellyMP', 'CatherineKingMP', 'KateLundy', 'RobMitchellMP',
    'ShayneNeumannMP', 'Deborah_ONeill', 'JulieOwensMP', 'Louise_Pratt', 'bernieripollmp', 'AmandaRishworth', 'KRuddMP', 'JanelleSaffin', 'SenNickSherry', 'billshortenmp', 'ursulastephens',
    'DobellThommo', 'KelvinThomsonMP', 'MrKRudd','DBradbury1021','pgarrett',  'SteveGibbonsXMP'
];

var greenPoliticians = ['AdamBandt', 'BobBrownFndn', 'sarahinthesen8', 'SenatorLudlam', 'senatormilne', 'SenatorSiewert'];

var nationalsPoliticians = ['GChristensenMP', 'Barnaby_Joyce', 'SenatorWacka', 'DarrenChesterMP', 'M_McCormackMP'];

var familyPoliticians = ['senatorsteve'];

var independentPoliticians = ['OakeyMP'];
// var temp1 = _.union(liberalPoliticians, laborPoliticians);
// var temp2 = _.union(greenPoliticians, nationalsPoliticians);
// var temp3 = _.union(temp2, familyPoliticians);
// var  politicians = _.union(temp1, temp3);

var politicians = independentPoliticians;



var polLength = politicians.length;
var n = 0;





function writeToDB(screenName) {
    for (i = 1; i <= 16; i++) {
        T.get('statuses/user_timeline', {
            screen_name: screenName,
            count: 200,
            page: i
        }, function(err1, tweets) {
            if (err1) {
                console.log('err1=' + err1);
                console.log('screenName=' + screenName);
            } else {
                _.each(tweets, function(item) {
                    if (item.coordinates != null && item.coordinates != 'null') {
                        //console.log(item);
                    }
                    item._id = item.id_str;
                    tweetDB.insert(item, function(err, body, header) {

                        if (err) {
                            console.log('[insert] ', err.message);
                            console.log('screenName=' + screenName);
                        } else {
                            //console.log('you have inserted the tweet');
                            //console.log('screenName=' + screenName);
                        }

                    });
                });
            }


        });
    }
}
setInterval(function() {
    console.log(Date.now());
    writeToDB(politicians[n]);
    n++;
    if (n == polLength) {
        console.log('stop interval');
        clearInterval();
        process.exit(code = 0);
    }
}, 100000);
