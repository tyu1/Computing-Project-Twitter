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
                    text: 'Follower Counts and Distribution (In or Out AU)'
                },
                subtitle: {
                    text: ''
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
                        text: 'Counts',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ''
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
                    name: 'Follower Count In AU',
                    data: inAUArr
                }, {
                    name: 'Follower Count Not In AU',
                    data: notInAUArr
                }]
             
             
            });
});
});