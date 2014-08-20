var twitter = require('twit'),
          _ = require('lodash');

var T = new twitter({
    consumer_key: "O5DDzLfQJBnmaUVwmy69irD52",
      consumer_secret: "35uoTYTzOrvmwIYWAadilrAUrugYIfs20ZGDtFRcWFUVnY4Gop",
      access_token: "2725430768-Zf83AmBnMi7AZKhe2HycZkPPHT41lhNttGHH0d2",
      access_token_secret: "9SDibQ5eKzCFDglhxM0qrNP2zn149lL5fHr1xquWdofiz"
});

var dbName = 'poli_relation';
var tweetDB;
var nano = require('nano')('http://127.0.0.1:5984');


nano.db.create(dbName, function(err, body) {
    // specify the database we are going to use
    if (!err) {
        tweetDB = nano.use(dbName);
    } else {
        console.log('create db error=' + err);
    }

});
tweetDB = nano.use(dbName);

var liberalPoliticians = ['LouiseAsherMP','TedBaillieu','RobertClarkMP','PhilipDaviesMP','MatthewGuyMP','DavidHodgettMP',
                          'WendyLovellMP','TerryMulderMP','Vic_Premier','michaelobrienmp','ODonohueMLC','RichPhillipsMLC',
                           'RyanSmithMP','heidivic','NickWakelingMP','KimWellsMP','Mary_Wooldridge'];
var laborPoliticians = ['JacintaAllanMP','DanielAndrewsMP','JBrumby','LilyDAmbrosioMP','LukeDonnellan','johnerenmp','MartinFoleyMP',
                        'DanielleGreenMP','JoeHelper1','JillHennessyMP','SteveHerbertMP','Tim_Holding','HullsRob','NatHutchins',
                        'GavinJennings','JohnLendersMP','JMaddenMP','JamesMerlinoMP','JennyMikakos','maxVmor','LisanevilleMP','wadenoonan',
                        'MartinPakulaMP','timpallas','Bronwyn_Pike','RichardsonFiona','AdemSomyurek','BrianTeeMP','rwynnemp'];
var greenPoliticians = ['GregMLC','ColleenHartland','sueMLC'];
var nationalsPoliticians = ['TimBullMP','HughDelahunty','DDrumMP','RussellNortheMP','JPowellMP','peterryanMP','PeterWalshMP'];

var politicians = {};
politicians['liberal'] = liberalPoliticians;
politicians['labor'] = laborPoliticians;
politicians['green'] = greenPoliticians;
politicians['nationals'] = nationalsPoliticians;

var peopleList = [];
var partyList = [];
for (var key in politicians) {
    for (var i = 0; i < politicians[key].length; i++) {
        peopleList.push(politicians[key][i]);
        partyList.push(key);

    }
}


var sourcePeopleList = [];
var targetPeopleList = [];
var sourcePartyList = [];
var targetPartyList = [];

for (var i = 0; i < peopleList.length; i++) {
    var sourcePeople =  peopleList[i];    
    for (var t = i + 1; t < peopleList.length; t++) {
        sourcePeopleList.push(sourcePeople);
        sourcePartyList.push(partyList[i]);
        targetPeopleList.push(peopleList[t]);
        targetPartyList.push(partyList[t]);
    }
}


var m = sourcePeopleList.length;
console.log('length=' + m);


function writeToDB(sourcePeople, targetPeople, sourceParty, targetParty) {
    // console.log(party + " " + screenName);
    T.get('friendships/show', {
        source_screen_name: sourcePeople,
        target_screen_name: targetPeople

    }, function(err1, data, response) {
        if (err1) {
            console.log('err1=' + err1);
            console.log('screenName=' + sourcePeople);
        } else {
           var relationship = data.relationship;
           console.log('relationship=' + relationship);
           relationship.target.party = targetParty;
           relationship.source.party = sourceParty;
            tweetDB.insert(relationship, function(err, body, header) {

                if (err) {
                    console.log('[insert] ', err.message);
                } else {
                    console.log(sourcePeople + ' relation has inserted into db')
                }

            });
        }
    });

}

var n = 0;
setInterval(function() {
    console.log(Date.now());

    writeToDB(sourcePeopleList[n], targetPeopleList[n], sourcePartyList[n], targetPartyList[n]);
    n++;
    if (n == m) {
        console.log('All done!');
        clearInterval();
        process.exit(code = 0);
    }
}, 6000);
