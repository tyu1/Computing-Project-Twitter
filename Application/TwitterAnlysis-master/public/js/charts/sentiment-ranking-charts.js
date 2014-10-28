$(function() {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/sentimentPositiveRanking",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        console.log(results);
        _.forEach(results, function(politicianInfo) {
            var politicianName = politicianInfo.key;
            var value = politicianInfo.value;
            console.log(politicianInfo);
            politiciansArr.push([politicianName, value]);
        });


        $('#sentimentPositiveRanking').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Positive tweet Number(politician)'
        },
        subtitle: {
            text: 'Positive tweet Number(politician)'
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
                text: 'Tweets Count'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Tweets Count: <b>{point.y:.1f}</b>'
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


$(function() {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/sentimentNegativeRanking",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        console.log(results);
        _.forEach(results, function(politicianInfo) {
            var politicianName = politicianInfo.key;
            var value = politicianInfo.value;
            console.log(politicianInfo);
            politiciansArr.push([politicianName, value]);
        });


        $('#sentimentNegativeRanking').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Negative Tweet Number (politician)'
        },
        subtitle: {
            text: 'Negative Tweet Number (politician)'
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
                text: 'Tweets Count'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Tweets Count: <b>{point.y:.1f}</b>'
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