var Twit = require('twit'),

    _ = require('underscore'),
    util = require('util');

var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});




var dbName = 'politician_info';
var tweetDB;
var nano = require('nano')('http://admin:noot@127.0.0.1:5984');
nano.db.destroy(dbName, function() {});


nano.db.create(dbName, function(err, body) {
    // specify the database we are going to use
    if (!err) {
        tweetDB = nano.use(dbName);
    } else {
        console.log('create db error=' + err);
    }

});
tweetDB = nano.use(dbName);
// var politicians = ['TonyAbbottMHR', 'JulieBishopMP', 'SenatorAbetz', 'JoeHockey', 'Barnaby_Joyce', 'kevinandrewsmp', 'TurnbullMalcolm', 'PeterDutton_MP', 'BruceBillsonMP', 'AndrewRobbMP',
//     'greghuntmp', 'ScottMorrisonMP', 'sussanley', 'michaelkeenanmp', 'stuartrobertmp', 'BriggsJamie', 'bobbaldwinmp', 'steveciobo', 'Birmo', 'DarrenChesterMP', 'paulwfletcher',
//     'JoshFrydenberg', 'AlanTudgeMP', 'M_McCormackMP', 'MrKRudd', 'JuliaGillard'
// ];
var liberalPoliticians = ['TonyAbbottMHR', 'SenatorAbetz', 'JohnAlexanderMP', 'KarenAndrewsMP', 'senatorback', 'bobbaldwinmp', 'GuyBarnett', 'corybernardi', 'Birmo',
    'JulieBishopMP', 'SenatorSue', 'BriggsJamie', 'SenatorBushby', 'steveciobo', 'richardmcolbeck', 'helencoonan', 'MathiasCormann', 'PeterDutton_MP', 'pilbaraboy', 'paulwfletcher',
    'JoshFrydenberg', 'JoGash', 'NatashaGriggsMP', 'AlexHawkeMP', 'JoeHockey', 'garyhumphries', 'GregHuntMP', 'SteveIronsMP', 'DennisJensenMP', 'EwenforHerbert', 'Craig4Hughes',
    'AndrewLamingMP', 'sussanley', 'LouiseMarkusMP', 'RussellMatheson', 'ScottMorrisonMP', 'KellyODwyer', 'AndrewRobbMP', 'stuartrobertmp', 'Wyatt_MP',
    'asouthcottmp', 'SharmanStone', 'DanTehanWannon', 'AlanTudgeMP', 'TurnbullMalcolm', 'BertVanManen', 'KenWyattMP', 'Barnaby_Joyce', 'kevinandrewsmp', 'BruceBillsonMP', 'greghuntmp', 'michaelkeenanmp'
];

var laborPoliticians = ['Mark_Arbib', 'SharonBirdMP', 'Bowenchris', 'DavidBradburyMP', 'Tony_Burke', 'NickChampionMP', 'JasonClareMP', 'trishcrossin', 'KateEllisMP', 'fitzhunter',
    'PGarrettMP', 'stevegeorganas', 'SteveGibbonsMP', 'JuliaGillard', 'JillHallMP', 'edhusicMP', 'stephenjonesALP', 'MikeKellyMP', 'CatherineKingMP', 'KateLundy', 'RobMitchellMP',
    'ShayneNeumannMP', 'Deborah_ONeill', 'JulieOwensMP', 'Louise_Pratt', 'bernieripollmp', 'AmandaRishworth', 'KRuddMP', 'JanelleSaffin', 'SenNickSherry', 'billshortenmp', 'ursulastephens',
    'DobellThommo', 'KelvinThomsonMP', 'MrKRudd'
];

var greenPoliticians = ['AdamBandt', 'BobBrownFndn', 'sarahinthesen8', 'SenatorLudlam', 'senatormilne', 'SenatorSiewert'];

var nationalsPoliticians = ['GChristensenMP', 'Barnaby_Joyce', 'SenatorWacka', 'DarrenChesterMP', 'M_McCormackMP'];


var familyPoliticians = ['senatorsteve'];

var independentPoliticians = ['OakeyMP'];
// var temp1 = _.union(liberalPoliticians, laborPoliticians);
// var temp2 = _.union(greenPoliticians, nationalsPoliticians);
// var temp3 = _.union(temp2, familyPoliticians);
// var  politicians = _.union(temp1, temp3);
var politicians = {};
politicians['liberal'] = liberalPoliticians;
politicians['labor'] = laborPoliticians;
politicians['green'] = greenPoliticians;
politicians['nationals'] = nationalsPoliticians;
politicians['family'] = familyPoliticians;
politicians['independent'] = independentPoliticians;


var n = 0;
var peopleList = [];
var parttyList = [];
for (var key in politicians) {
    for (var i = 0; i < politicians[key].length; i++) {
        peopleList.push(politicians[key][i]);
        parttyList.push(key);

    }
}

var m = peopleList.length;


function writeToDB(screenName, party) {
    // console.log(party + " " + screenName);
    T.get('users/show', {
        screen_name: screenName,

    }, function(err1, data, response) {
        if (err1) {
            console.log('err1=' + err1);
            console.log('screenName=' + screenName);
        } else {
            data.party = party;
            tweetDB.insert(data, function(err, body, header) {

                if (err) {
                    console.log('[insert] ', err.message);
                } else {
                    console.log('you have inserted the tweet')
                }

            });
        }
    });

}
setInterval(function() {
    console.log(Date.now());

    writeToDB(peopleList[n], parttyList[n]);

    // clearInterval();
    // process.exit(code = 0);
    n++;
    if (n == m) {
        console.log('stop interval1');
        clearInterval();
        process.exit(code = 0);
    }
}, 20000);
