//****************************************************public tweet time by hour********************************************
$(function () {


     $(document).ready(function() {
             var jsonData = $.ajax({
                    url: "/publicPartyTweetTime",
                    dataType: "json",
                    async: false
                }).responseText;

                var results = jQuery.parseJSON(jsonData);
                var liberalTweetTimeList = [];
                var laborTweetTimeList = [];
                var greenTweetTimeList = [];
                var nationalsTweetTimeList = [];
                _.forEach(results, function(partyTime) {
                   // console.log(partyTime);
                    var search_key = partyTime.key;
                    //console.log(search_key[0], search_key[1]);
                    var partyName = search_key[0];
                    //console.log(partyName);

                    var tweetTime= search_key[1];
                    var politiciansNo = partyTime.value;
                    //console.log(partyName);
                    //console.log(tweetTime, politiciansNo);
                    switch (partyName) {
                    case 'labor':
                        laborTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                    case 'liberal':
                        liberalTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                    case null:
                        nationalsTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                    case 'green':
                        greenTweetTimeList.push([tweetTime,politiciansNo]);
                        break;
                }
                });

            $('#publicPartyTweetTime').highcharts({
                title: {
                    text: 'Public tweets (on Politicians) Counts Across 24 Hours In a Day',
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
                    valueSuffix: ''
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
                    name: 'green',
                    data: greenTweetTimeList
                }]
            });
});
});

////****************************************************
$(function () {
     $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetSource",
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
 
            $('#publicTweetSource').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 1,
                    plotShadow: false
                },
                title: {
                    text: 'Tweets Source',
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