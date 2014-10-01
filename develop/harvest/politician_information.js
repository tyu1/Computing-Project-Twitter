var twitter = require('twit'),
     _ = require('lodash');

var T = new twitter({
     consumer_key: "O5DDzLfQJBnmaUVwmy69irD52",
      consumer_secret: "35uoTYTzOrvmwIYWAadilrAUrugYIfs20ZGDtFRcWFUVnY4Gop",
      access_token: "2725430768-Zf83AmBnMi7AZKhe2HycZkPPHT41lhNttGHH0d2",
      access_token_secret: "9SDibQ5eKzCFDglhxM0qrNP2zn149lL5fHr1xquWdofiz"
});



var dbName = 'polit_info';
var tweetDB;
var nano = require('nano')('http://127.0.0.1:5984');

nano.db.create(dbName, function(err, body) {
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
                    console.log(screenName + ' information has inserted into db')
                }

            });
        }
    });

}
setInterval(function() {
    console.log(Date.now());
    writeToDB(peopleList[n], parttyList[n]);
    n++;
    if (n == m) {
        console.log('stop interval1');
        clearInterval();
        process.exit(code = 0);
    }
}, 10000);
