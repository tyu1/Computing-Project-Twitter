// *********************************** Politician Tweets Leaderboard *******************************************

$(function() {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/retweetCounts",
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
