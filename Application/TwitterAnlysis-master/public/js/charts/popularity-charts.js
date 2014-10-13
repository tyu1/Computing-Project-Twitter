// *********************************** Politician Tweets Leaderboard *******************************************

$(function() {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicRetweetCountPerson",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        _.forEach(results, function(retweetInfo) {
            var retweetsNo = retweetInfo.key;
            var polName = retweetInfo.value.name;
            var polParty = retweetInfo.value.party;
            polParty = polParty.charAt(0).toUpperCase() + polParty.slice(1);
            politiciansArr.push([polName, retweetsNo]);
        });


        $('#retweetsRanking').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Retweets Ranking'
        },
        subtitle: {
            text: 'Top 10 politicians with most retweets'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Retweets Count'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Retweets Count: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: 'Retweets',
            data: politiciansArr,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });



    });
});
// *********************************** Party Retweet Count By Public Leaderboard *******************************************

$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/partyRetweetCount",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var laborNo, liberalNo, nationalNo, greenNo;

        _.forEach(results, function(party) {
            //console.log(party.key[0]);
            var retweetsParty = party.key[0].toUpperCase();
            var polValue = party.value;
            //console.log(retweetsParty)
            switch (retweetsParty) {
                case 'LABOR':
                    laborNo = polValue;
                    $('#laborPoliticianNo').text(polValue)
                    break;
                case 'LIBERAL':
                    liberalNo = polValue;
                    $('#liberalPoliticianNo').text(polValue)
                    break;
                case 'NATIONALS':
                    nationalNo = polValue;
                    $('#nationalPoliticianNo').text(polValue)
                    break;
                case 'GREEN':
                    greenNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
            }
        });

        var allPoliticianNo = laborNo + liberalNo +nationalNo + greenNo;
        laberProp = laborNo / allPoliticianNo;
        liberalProp = liberalNo / allPoliticianNo;
        nationalProp = nationalNo / allPoliticianNo;
        greenProp = greenNo / allPoliticianNo;
        $('#partyRetweetRanking').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,//null,
                plotShadow: false
            },
            title: {
                text: 'Retweet count percentage for party'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['labor',   laberProp],
                    ['liberal',       liberalProp],
                    ['nationals',     nationalProp],
                    ['green',   greenProp]
                ]
            }]
        });
});
});

// *********************************** Labor Retweet Time Zone By Public Leaderboard *******************************************
$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/retweetTimeZoneParty",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var laborMelbourneNo, laborSydneyNo, laborCanberraNo, laborBrisbaneNo,laborAdelaideNo,laborOthersNo;

        _.forEach(results, function(partyTimeZoneInfo) {
            //console.log(party.key[0]);
            var retweetsPartyName = partyTimeZoneInfo.key[0].toUpperCase();
            var retweetsTimeZone = partyTimeZoneInfo.key[1];
            var polValue = partyTimeZoneInfo.value;
            //console.log(retweetsParty)
            //console.log(polValue);
            if(retweetsPartyName === 'LABOR'){
            switch (retweetsTimeZone) {
                case 'Melbourne':
                    laborMelbourneNo = polValue;
                    $('#laborPoliticianNo').text(polValue)
                    break;
                case 'Sydney':
                    laborSydneyNo = polValue;
                    $('#liberalPoliticianNo').text(polValue)
                    break;
                case 'Canberra':
                    laborCanberraNo = polValue;
                    $('#nationalPoliticianNo').text(polValue)
                    break;
                case 'Brisbane':
                    laborBrisbaneNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Adelaide':
                    laborAdelaideNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Others':
                    laborOthersNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break; 
            }
        }
        });

        var allPoliticianNo = laborMelbourneNo + laborSydneyNo +laborCanberraNo + laborBrisbaneNo + laborAdelaideNo + laborOthersNo;
        MelbourneProp = laborMelbourneNo / allPoliticianNo;
        SydneyProp = laborSydneyNo / allPoliticianNo;
        CanberraProp = laborCanberraNo / allPoliticianNo;
        BrisbaneProp = laborBrisbaneNo / allPoliticianNo;
        AdelaideProp = laborAdelaideNo / allPoliticianNo;
        OthersProp = laborOthersNo / allPoliticianNo;
        $('#laborRetweetTimeZone').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Retweet count percentage(Labor)'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Melbourne',   MelbourneProp],
                    ['Sydney',       SydneyProp],
                    ['Canberra',     CanberraProp],
                    ['Brisbane',   BrisbaneProp],
                    ['Adelaide',     AdelaideProp],
                    ['Others',   OthersProp]
                ]
            }]
        });
});
});

// *********************************** Liberal Retweet Time Zone By Public Leaderboard *******************************************

$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/retweetTimeZoneParty",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var laborMelbourneNo, laborSydneyNo, laborCanberraNo, laborBrisbaneNo,laborAdelaideNo,laborOthersNo;

        _.forEach(results, function(partyTimeZoneInfo) {
            //console.log(party.key[0]);
            var retweetsPartyName = partyTimeZoneInfo.key[0].toUpperCase();
            var retweetsTimeZone = partyTimeZoneInfo.key[1];
            var polValue = partyTimeZoneInfo.value;
            //console.log(retweetsParty)
            //console.log(polValue);
            if(retweetsPartyName === 'LIBERAL'){
            switch (retweetsTimeZone) {
                case 'Melbourne':
                    liberalMelbourneNo = polValue;
                    $('#laborPoliticianNo').text(polValue)
                    break;
                case 'Sydney':
                    liberalSydneyNo = polValue;
                    $('#liberalPoliticianNo').text(polValue)
                    break;
                case 'Canberra':
                    liberalCanberraNo = polValue;
                    $('#nationalPoliticianNo').text(polValue)
                    break;
                case 'Brisbane':
                    liberalBrisbaneNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Adelaide':
                    liberalAdelaideNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Others':
                    liberalOthersNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break; 
            }
        }
        });

        var allPoliticianNo = liberalMelbourneNo + liberalSydneyNo +liberalCanberraNo + liberalBrisbaneNo + liberalAdelaideNo + liberalOthersNo;
        MelbourneProp = liberalMelbourneNo / allPoliticianNo;
        SydneyProp = liberalSydneyNo / allPoliticianNo;
        CanberraProp = liberalCanberraNo / allPoliticianNo;
        BrisbaneProp = liberalBrisbaneNo / allPoliticianNo;
        AdelaideProp = liberalAdelaideNo / allPoliticianNo;
        OthersProp = liberalOthersNo / allPoliticianNo;
        $('#liberalRetweetTimeZone').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Retweet count percentage(Liberal)'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Melbourne',   MelbourneProp],
                    ['Sydney',       SydneyProp],
                    ['Canberra',     CanberraProp],
                    ['Brisbane',   BrisbaneProp],
                    ['Adelaide',     AdelaideProp],
                    ['Others',   OthersProp]
                ]
            }]
        });
});
});
// *********************************** Nationals Retweet Time Zone By Public Leaderboard *******************************************
$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/retweetTimeZoneParty",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var laborMelbourneNo, laborSydneyNo, laborCanberraNo, laborBrisbaneNo,laborAdelaideNo,laborOthersNo;

        _.forEach(results, function(partyTimeZoneInfo) {
            //console.log(party.key[0]);
            var retweetsPartyName = partyTimeZoneInfo.key[0].toUpperCase();
            var retweetsTimeZone = partyTimeZoneInfo.key[1];
            var polValue = partyTimeZoneInfo.value;
            //console.log(retweetsParty)
            //console.log(polValue);
            if(retweetsPartyName === 'NATIONALS'){
            switch (retweetsTimeZone) {
                case 'Melbourne':
                    nationalsMelbourneNo = polValue;
                    $('#laborPoliticianNo').text(polValue)
                    break;
                case 'Sydney':
                    nationalsSydneyNo = polValue;
                    $('#liberalPoliticianNo').text(polValue)
                    break;
                case 'Canberra':
                    nationalsCanberraNo = polValue;
                    $('#nationalPoliticianNo').text(polValue)
                    break;
                case 'Brisbane':
                    nationalsBrisbaneNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Adelaide':
                    nationalsAdelaideNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Others':
                    nationalsOthersNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break; 
            }
        }
        });

        var allPoliticianNo = nationalsMelbourneNo + nationalsSydneyNo +nationalsCanberraNo + nationalsBrisbaneNo + nationalsAdelaideNo + nationalsOthersNo;
        MelbourneProp = nationalsMelbourneNo / allPoliticianNo;
        SydneyProp = nationalsSydneyNo / allPoliticianNo;
        CanberraProp = nationalsCanberraNo / allPoliticianNo;
        BrisbaneProp = nationalsBrisbaneNo / allPoliticianNo;
        AdelaideProp = nationalsAdelaideNo / allPoliticianNo;
        OthersProp = nationalsOthersNo / allPoliticianNo;
        $('#nationalsRetweetTimeZone').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Retweet count percentage(Nationals))'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Melbourne',   MelbourneProp],
                    ['Sydney',       SydneyProp],
                    ['Canberra',     CanberraProp],
                    ['Brisbane',   BrisbaneProp],
                    ['Adelaide',     AdelaideProp],
                    ['Others',   OthersProp]
                ]
            }]
        });
});
});
// *********************************** Green Retweet Time Zone By Public Leaderboard *******************************************

$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/retweetTimeZoneParty",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var laborMelbourneNo, laborSydneyNo, laborCanberraNo, laborBrisbaneNo,laborAdelaideNo,laborOthersNo;

        _.forEach(results, function(partyTimeZoneInfo) {
            //console.log(party.key[0]);
            var retweetsPartyName = partyTimeZoneInfo.key[0].toUpperCase();
            var retweetsTimeZone = partyTimeZoneInfo.key[1];
            var polValue = partyTimeZoneInfo.value;
            //console.log(retweetsParty)
            //console.log(polValue);
            if(retweetsPartyName === 'GREEN'){
            switch (retweetsTimeZone) {
                case 'Melbourne':
                    nationalsMelbourneNo = polValue;
                    $('#laborPoliticianNo').text(polValue)
                    break;
                case 'Sydney':
                    nationalsSydneyNo = polValue;
                    $('#liberalPoliticianNo').text(polValue)
                    break;
                case 'Canberra':
                    nationalsCanberraNo = polValue;
                    $('#nationalPoliticianNo').text(polValue)
                    break;
                case 'Brisbane':
                    nationalsBrisbaneNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Adelaide':
                    nationalsAdelaideNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break;
                case 'Others':
                    nationalsOthersNo = polValue;
                    $('#greenPoliticianNo').text(polValue)
                    break; 
            }
        }
        });

        var allPoliticianNo = nationalsMelbourneNo + nationalsSydneyNo +nationalsCanberraNo + nationalsBrisbaneNo + nationalsAdelaideNo + nationalsOthersNo;
        MelbourneProp = nationalsMelbourneNo / allPoliticianNo;
        SydneyProp = nationalsSydneyNo / allPoliticianNo;
        CanberraProp = nationalsCanberraNo / allPoliticianNo;
        BrisbaneProp = nationalsBrisbaneNo / allPoliticianNo;
        AdelaideProp = nationalsAdelaideNo / allPoliticianNo;
        OthersProp = nationalsOthersNo / allPoliticianNo;
        $('#greenRetweetTimeZone').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Retweet count percentage(Green))'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Melbourne',   MelbourneProp],
                    ['Sydney',       SydneyProp],
                    ['Canberra',     CanberraProp],
                    ['Brisbane',   BrisbaneProp],
                    ['Adelaide',     AdelaideProp],
                    ['Others',   OthersProp]
                ]
            }]
        });
});
});
//************************************ each party tweet source ******************************************************************************
$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/partySourceDistro",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var androidSourceDistro = [];
        var blackberrySourceDistro = [];
        var iosSourceDistro = [];
        var mobileWebSourceDistro = [];
        var webSourceDistro = [];

        _.forEach(results, function(partyTimeZoneInfo) {
            //console.log(party.key[0]);
            var tweetsPartyName = partyTimeZoneInfo.key[0].toUpperCase();
            var tweetsSource = partyTimeZoneInfo.key[1];
            var polValue = partyTimeZoneInfo.value;
            //console.log(retweetsParty)
            //console.log(tweetsSource);
            //console.log(polValue);
            if(tweetsSource === 'Android'){
             androidSourceDistro.push(polValue)
             }
            else if(tweetsSource === 'BlackBerry'){
             blackberrySourceDistro.push(polValue)
             }
            else if(tweetsSource === 'iOS'){
             iosSourceDistro.push(polValue)
             }
            else if(tweetsSource === 'Twitter Mobile Web'){
             mobileWebSourceDistro.push(polValue)
             }
             else if(tweetsSource === 'web'){
             webSourceDistro.push(polValue)
             }
        });
            $('#partySourceDistro').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Stacked column chart'
                },
                xAxis: {
                    categories: ['green', 'labor', 'liberal', 'nationals']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total fruit consumption'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -70,
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black, 0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Android',
                    data:  androidSourceDistro
                }, {
                    name: 'BlackBerry',
                    data: blackberrySourceDistro
                }, {
                    name: 'iOS',
                    data: iosSourceDistro
                },{
                    name: 'Twitter Mobile Web',
                    data: mobileWebSourceDistro
                },{
                    name: 'web',
                    data: webSourceDistro
                }]
            });
});
});
//************************************ all politician tweet source ***********************************************************
$(function () {
     $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/tweetDistro",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var androidSourceNo, blackberrySourceNo, iosSourceNo, mobileWebSourceNo, webSourceNo;
        var androidSourcePro, blackberrySourcePro, iosSourcePro, mobileWebSourcePro, webSourcePro;
        _.forEach(results, function(sourceInfo) {
            //console.log(party.key[0]);
            var sourceName = sourceInfo.key;
            var polValue = sourceInfo.value;
            switch (sourceName){
                case 'Android':
                     androidSourceNo = polValue;
                     break;
                case 'BlackBerry':
                     blackberrySourceNo = polValue;
                     break;
                case 'iOS':
                     iosSourceNo = polValue;
                     break;
                case 'Twitter Mobile Web':
                     mobileWebSourceNo = polValue;
                     break;
                case 'web':
                     webSourceNo = polValue;
                     break;

            }
     
        });
        var totalNumber = androidSourceNo + blackberrySourceNo+ iosSourceNo+ mobileWebSourceNo+ webSourceNo;
        androidSourcePro = androidSourceNo / totalNumber;
        blackberrySourcePro = blackberrySourceNo / totalNumber;
        iosSourcePro = iosSourceNo / totalNumber;
        mobileWebSourcePro = mobileWebSourceNo / totalNumber;
        webSourcePro = webSourceNo / totalNumber;
 
            $('#tweetDistro').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: 'Browser<br>shares',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 50
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Politician Tweet Scource Distro',
                    innerSize: '60%',
                    data: [
                        ['Android',   androidSourcePro],
                        ['BlackBerry',       blackberrySourcePro],
                        ['iOS', iosSourcePro],
                        ['Twitter Mobile Web',    mobileWebSourcePro],
                        ['web',     webSourcePro],
                        
                    ]
                }]
            });
 });
});
//************************************* follower count each party**********************************************************
$(function () {
    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/partyFollowerCount",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var greenInAU, greenNotInAU, laborInAu, laborNotInAu, liberalInAu, liberalNotInAu, nationalsInAU, nationalsNotInAU;
        var androidSourcePro, blackberrySourcePro, iosSourcePro, mobileWebSourcePro, webSourcePro;
        var inAUArr = [];
        var notInAUArr = [];



        _.forEach(results, function(followerDistro) {
            //console.log(party.key[0]);
            var followerParty = followerDistro.key[0].toUpperCase();
            var followerSentiment = followerDistro.key[1];
            var polValue = followerDistro.value;
            if(followerSentiment === '1'){
                switch (followerParty){
                    
                    case 'LABOR':
                         laborInAu = polValue;
                         break;
                    case 'LIBERAL':
                         liberalInAu = polValue;
                         break;
                    case 'NATIONALS':
                         nationalsInAU = polValue;
                         break;
                    case 'GREEN':
                         greenInAU = polValue;
                         break;
                }
                inAUArr.push(polValue);
                }
            else{
                switch (followerParty){
                   
                    case 'LABOR':
                         laborNotInAu = polValue;
                         break;
                    case 'LIBERAL':
                         liberalNotInAu = polValue;
                         break;
                    case 'NATIONALS':
                         nationalsNotInAU = polValue;
                         break;
                    case 'GREEN':
                         greenNotInAU = polValue;
                         break;
                }
                notInAUArr.push(polValue);
              }
            
          });
     
          var totalNumberLabor = laborInAu + laborNotInAu;
        var totalNumberLiberal =liberalInAu + liberalNotInAu;
        var totalNumberNationals =nationalsInAU + nationalsNotInAU;
        var totalNumberGreen =greenInAU + greenNotInAU;
        console.log(totalNumberLabor);
        var totalNumberArr = [totalNumberGreen,totalNumberLabor,totalNumberLiberal,totalNumberNationals];
        console.log('inAUArr' + inAUArr);
        console.log('notInAUArr' + notInAUArr);
        console.log('totalNumberArr' + totalNumberArr);
            $('#partyFollowerCount').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Historic World Population by Region'
                },
                subtitle: {
                    text: 'Source: Wikipedia.org'
                },
                xAxis: {
                    categories: ['Green','Labor', 'Liberal', 'Nationals'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },  series: [{
                    name: 'Total Number',
                    data: totalNumberArr
                }, {
                    name: 'Count In AU',
                    data: inAUArr
                }, {
                    name: 'Count Not In AU',
                    data: notInAUArr
                }]
             
             
            });
});
});
      


