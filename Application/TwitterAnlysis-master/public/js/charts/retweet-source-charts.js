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
                    text: 'Tweets Source Distribution For Each Party'
                },
                xAxis: {
                    categories: ['green', 'labor', 'liberal', 'nationals']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Source Distribution'
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
                    text: 'Source Distribution',
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