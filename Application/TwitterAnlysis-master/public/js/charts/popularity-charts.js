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
            console.log(retweetInfo)
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



