$(function () {
    $(document).ready(function() {

            var jsonData = $.ajax({
                url: "/individualTweetsSentiment",
                dataType: "json",
                async: false
            }).responseText;

            var results = jQuery.parseJSON(jsonData);
            var positiveNo2013 = [];
            var negativeNo2013 = [];
            var positiveNo2014 = [];
            var negativeNo2014 = [];


            _.forEach(results, function(party) {
                var name = party.key[0];
                var time = party.key[1];
                var sentiment = party.key[2];
                var no= party.value;
                if(sentiment === 1 && time === 2013){
                   positiveNo2013.push(no);
                }else if(sentiment === 0 && time === 2013){
                    negativeNo2013.push(no);
                }else if(sentiment === 1 && time === 2014){
                    positiveNo2014.push(no);
                }else if(sentiment === 0 && time === 2014){
                    negativeNo2014.push(no);
                }
                
            });

        $('#individualTweetsSentiment').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: positiveNo2013

            }, {
                name: 'New York',
                data: negativeNo2013
            }, {
                name: 'London',
                data: positiveNo2014
            }, {
                name: 'Berlin',
                data: negativeNo2014
            }]
        });
    });
});

