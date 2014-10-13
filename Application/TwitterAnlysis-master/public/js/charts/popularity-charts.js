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

      


