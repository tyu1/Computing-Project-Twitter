//****************************************************party tweet time****************************************************
$(function() {

        $(document).ready(function() {

            var jsonData = $.ajax({
                url: "/partyTweetTimeDay",
                dataType: "json",
                async: false
            }).responseText;

            var results = jQuery.parseJSON(jsonData);
            var monNo, tueNo, wedNo, thuNo, friNo, satNo, sunNo;

            _.forEach(results, function(partyTweetTimeInfo) {
                var DayName = partyTweetTimeInfo.key;
                var tweetsNo = partyTweetTimeInfo.value;
                switch (DayName){
                    case 'Monday':
                         monNo = tweetsNo;
                         break;
                    case 'Tuesday':
                         tueNo = tweetsNo;
                         break;
                    case 'Wednesday':
                         wedNo = tweetsNo;
                         break;
                    case 'Thursday':
                         thuNo = tweetsNo;
                         break;
                    case 'Friday':
                         friNo = tweetsNo;
                         break;
                    case 'Saturday':
                         satNo = tweetsNo;
                         break;
                    case 'Sunday':
                         sunNo = tweetsNo;
                         break;


                }
                
            });
            var dayNoTotal = monNo+tueNo+wedNo+thuNo+friNo+satNo+sunNo;
            var monPro = monNo / dayNoTotal;
            var tueNo = tueNo / dayNoTotal;
            var wedNo = wedNo / dayNoTotal;
            var thuNo = thuNo / dayNoTotal;
            var friNo = friNo / dayNoTotal;
            var satNo = satNo / dayNoTotal;
            var sunNo = sunNo / dayNoTotal;



            // Build the chart
            $('#partyTweetTimeDay').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 1,
                    plotShadow: false
                },
                title: {
                    text: 'Politician In VIC'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Tweet Day Distro',
                    data: [
                        ['Monday', monPro],
                        ['Tuesday', tueNo],
                        ['Wednesday', wedNo],
                        ['Thursday', thuNo],
                        ['Friday', friNo],
                        ['Saturday', satNo],
                        ['Sunday', sunNo],
                    ]
                }]
            });

        });
    });
//****************************************************party tweet time by hour********************************************
$(function () {


     $(document).ready(function() {
             var jsonData = $.ajax({
                    url: "/partyTweetTime",
                    dataType: "json",
                    async: false
                }).responseText;

                var results = jQuery.parseJSON(jsonData);
                var liberalTweetTimeList = [];
                var laborTweetTimeList = [];
                var greenTweetTimeList = [];
                var nationalsTweetTimeList = [];
                _.forEach(results, function(partyTime) {
                    console.log(partyTime);
                    var search_key = partyTime.key;
                    console.log(search_key[0], search_key[1]);
                    var partyName = search_key[0].toUpperCase();
                    var tweetTime= search_key[1];
                    var politiciansNo = partyTime.value;
                    console.log(partyName);
                    console.log(tweetTime, politiciansNo);
                    switch (partyName) {
                    case 'LABOR':
                        laborTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                    case 'LIBERAL':
                        liberalTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                    case 'NATIONALS':
                        nationalsTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                    case 'GREEN':
                        greenTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                }
                });

            $('#partyTweetTime').highcharts({
                title: {
                    text: 'Tweets Count for each party',
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    categories: ['1', '2', '3', '4', '5', '6',
                        '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24']
                },
                yAxis: {
                    title: {
                        text: 'Tweets Count'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [
                {
                    name: 'Labor',
                    data: laborTweetTimeList
                }, {
                    name: 'Liberal',
                    data: liberalTweetTimeList
                }, {
                    name: 'Nationals',
                    data: nationalsTweetTimeList
                }, {
                    name: 'Labor',
                    data: greenTweetTimeList
                }]
            });
});
});
