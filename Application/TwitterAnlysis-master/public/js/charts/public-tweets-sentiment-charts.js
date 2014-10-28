//********************************************public tweets sentiment of all politicians****************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentiment",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var nationalsPostiveNo,greenPositiveNo,laborPositiveNo,liberalPositiveNo,nationalsNegativeNo,greenNegativeNo,laborNegativeNo,liberalNegativeNo,
            nationalsNeutralNo,greenNeutralNo,laborNeutralNo,liberalNeutralNo;
        _.forEach(results, function(publicTweetsInfo) {
            var publicTweetsParty = publicTweetsInfo.key[0];
            var publicTweetsSen = publicTweetsInfo.key[1];
            var tweetsNo = publicTweetsInfo.value;
            if(publicTweetsSen == 'positive'){
                switch (publicTweetsParty){
                    case null:
                         nationalsPostiveNo = tweetsNo;
                         break;
                    case 'green':
                         greenPositiveNo = tweetsNo;
                         break;
                    case 'labor':
                         laborPositiveNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalPositiveNo = tweetsNo;
                          break;
                }

            }else if(publicTweetsSen == 'negative'){
                switch (publicTweetsParty){
                    case null:
                         nationalsNegativeNo = tweetsNo;
                         break;
                    case 'green':
                         greenNegativeNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNegativeNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNegativeNo = tweetsNo;
                          break;
                }


            }else{
                switch (publicTweetsParty){
                    case null:
                         nationalsNeutralNo = tweetsNo;
                         break;
                    case 'green':
                         greenNeutralNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNeutralNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNeutralNo = tweetsNo;
                          break;
                      }

            }
        });
        
        //var liberalPositivePro = liberalPositiveNo / (liberalPositiveNo + liberalNegativeNo);
        //var laborPositivePro = laborPositiveNo / (laborPositiveNo + laborNegativeNo);
        //var greenPositivePro = greenPositiveNo / (greenPositiveNo + greenNegativeNo);
        //var nationalsPostivepro = nationalsPostiveNo/ (nationalsPostiveNo + nationalsNegativeNo);
        //var liberalNegativePro = liberalNegativeNo / (liberalPositiveNo + liberalNegativeNo);
        //var laborNegativePro = laborNegativeNo / (laborPositiveNo + laborNegativeNo);
        //var greenNegativePro = greenNegativeNo / (greenPositiveNo + greenNegativeNo);
        //var nationalsNegativepro = nationalsNegativeNo/ (nationalsPostiveNo + nationalsNegativeNo);
        var positiveTotalNo = liberalPositiveNo + laborPositiveNo + greenPositiveNo+ nationalsPostiveNo;
        var negativeTotalNo =liberalNegativeNo + laborNegativeNo+ greenNegativeNo+ nationalsNegativeNo;
        var neutralTotalNo = nationalsNeutralNo + greenNeutralNo + laborNeutralNo + liberalNeutralNo;
        var totalNo = positiveTotalNo + negativeTotalNo + neutralTotalNo;
        var postiveTotalPro = positiveTotalNo / totalNo;
        var negativeTotalPro =negativeTotalNo / totalNo;
        var neutralTotalPro = neutralTotalNo / totalNo;
        $('#publicTweetsSentimentAll').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Public tweets Sentiment On All politicians'
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
                name: 'Tweets Sentiment',
                data: [
                    ['Positive',   postiveTotalPro],
                    ['negative',       negativeTotalPro],
                    ['neutral', neutralTotalPro]
                ]
            }]
        });
    });

});
//********************************************public tweets sentiment of all politicians****************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentiment",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var nationalsPostiveNo,greenPositiveNo,laborPositiveNo,liberalPositiveNo,nationalsNegativeNo,greenNegativeNo,laborNegativeNo,liberalNegativeNo,
            nationalsNeutralNo,greenNeutralNo,laborNeutralNo,liberalNeutralNo;
        _.forEach(results, function(publicTweetsInfo) {
            var publicTweetsParty = publicTweetsInfo.key[0];
            var publicTweetsSen = publicTweetsInfo.key[1];
            var tweetsNo = publicTweetsInfo.value;
            if(publicTweetsSen == 'positive'){
                switch (publicTweetsParty){
                    case null:
                         nationalsPostiveNo = tweetsNo;
                         break;
                    case 'green':
                         greenPositiveNo = tweetsNo;
                         break;
                    case 'labor':
                         laborPositiveNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalPositiveNo = tweetsNo;
                          break;
                }

            }else if(publicTweetsSen == 'negative'){
                switch (publicTweetsParty){
                    case null:
                         nationalsNegativeNo = tweetsNo;
                         break;
                    case 'green':
                         greenNegativeNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNegativeNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNegativeNo = tweetsNo;
                          break;
                }


            }else{
                switch (publicTweetsParty){
                    case null:
                         nationalsNeutralNo = tweetsNo;
                         break;
                    case 'green':
                         greenNeutralNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNeutralNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNeutralNo = tweetsNo;
                          break;

                    }
                }
        });
        
        var liberalPositivePro = liberalPositiveNo / (liberalPositiveNo + liberalNegativeNo + liberalNeutralNo);
        //var laborPositivePro = laborPositiveNo / (laborPositiveNo + laborNegativeNo);
        //var greenPositivePro = greenPositiveNo / (greenPositiveNo + greenNegativeNo);
        //var nationalsPostivepro = nationalsPostiveNo/ (nationalsPostiveNo + nationalsNegativeNo);
        var liberalNegativePro = liberalNegativeNo / (liberalPositiveNo + liberalNegativeNo + liberalNeutralNo);
        var liberalNeutralPro = liberalNeutralNo / (liberalPositiveNo + liberalNegativeNo + liberalNeutralNo);
        //var laborNegativePro = laborNegativeNo / (laborPositiveNo + laborNegativeNo);
        //var greenNegativePro = greenNegativeNo / (greenPositiveNo + greenNegativeNo);
        //var nationalsNegativepro = nationalsNegativeNo/ (nationalsPostiveNo + nationalsNegativeNo);
        //var positiveTotalNo = liberalPositiveNo + laborPositiveNo + greenPositiveNo+ nationalsPostiveNo;
        //var negtiveTotalNo =liberalNegativeNo + laborNegativeNo+ greenNegativeNo+ nationalsNegativeNo;
        //var totalNo = positiveTotalNo + negativeTotalNo;
        //var postiveTotalPro = positiveTotalNo / totalNo;
        //var negativeTotalPro =negtiveTotalNo / totalNo;
        $('#publicTweetsSentimentLiberal').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Tweets Sentiment(Liberal)'
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
                name: 'Tweets Sentiment',
                data: [
                    ['Positive',   liberalPositivePro],
                    ['negative',       liberalNegativePro],
                    ['neutral', liberalNeutralPro]
                ]
            }]
        });
    });

});
//********************************************public tweets sentiment of all politicians****************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentiment",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var nationalsPostiveNo,greenPositiveNo,laborPositiveNo,liberalPositiveNo,nationalsNegativeNo,greenNegativeNo,laborNegativeNo,liberalNegativeNo,
            nationalsNeutralNo,greenNeutralNo,laborNeutralNo,liberalNeutralNo;
        _.forEach(results, function(publicTweetsInfo) {
            var publicTweetsParty = publicTweetsInfo.key[0];
            var publicTweetsSen = publicTweetsInfo.key[1];
            var tweetsNo = publicTweetsInfo.value;
           if(publicTweetsSen == 'positive'){
                switch (publicTweetsParty){
                    case null:
                         nationalsPostiveNo = tweetsNo;
                         break;
                    case 'green':
                         greenPositiveNo = tweetsNo;
                         break;
                    case 'labor':
                         laborPositiveNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalPositiveNo = tweetsNo;
                          break;
                }

            }else if(publicTweetsSen == 'negative'){
                switch (publicTweetsParty){
                    case null:
                         nationalsNegativeNo = tweetsNo;
                         break;
                    case 'green':
                         greenNegativeNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNegativeNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNegativeNo = tweetsNo;
                          break;
                }


            }else{
                switch (publicTweetsParty){
                    case null:
                         nationalsNeutralNo = tweetsNo;
                         break;
                    case 'green':
                         greenNeutralNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNeutralNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNeutralNo = tweetsNo;
                          break;

                    }
                }
        });
        
        //var liberalPositivePro = liberalPositiveNo / (liberalPositiveNo + liberalNegativeNo);
        var laborPositivePro = laborPositiveNo / (laborPositiveNo + laborNegativeNo+ laborNeutralNo);
        //var greenPositivePro = greenPositiveNo / (greenPositiveNo + greenNegativeNo);
        //var nationalsPostivepro = nationalsPostiveNo/ (nationalsPostiveNo + nationalsNegativeNo);
        //var liberalNegativePro = liberalNegativeNo / (liberalPositiveNo + liberalNegativeNo);
        var laborNegativePro = laborNegativeNo / (laborPositiveNo + laborNegativeNo + laborNeutralNo);
        var laborNeutralPro = laborNeutralNo / (laborPositiveNo + laborNegativeNo + laborNeutralNo);
        //var greenNegativePro = greenNegativeNo / (greenPositiveNo + greenNegativeNo);
        //var nationalsNegativepro = nationalsNegativeNo/ (nationalsPostiveNo + nationalsNegativeNo);
        //var positiveTotalNo = liberalPositiveNo + laborPositiveNo + greenPositiveNo+ nationalsPostiveNo;
        //var negtiveTotalNo =liberalNegativeNo + laborNegativeNo+ greenNegativeNo+ nationalsNegativeNo;
        //var totalNo = positiveTotalNo + negativeTotalNo;
        //var postiveTotalPro = positiveTotalNo / totalNo;
        //var negativeTotalPro =negtiveTotalNo / totalNo;
        $('#publicTweetsSentimentLabor').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Tweets Sentiment(Labor)'
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
                name: 'Tweet Sentiment',
                data: [
                    ['Positive',   laborPositivePro],
                    ['negative',       laborNegativePro],
                     ['neutral', laborNeutralPro]

                ]
            }]
        });
    });

});
//********************************************public tweets sentiment of all politicians****************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentiment",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var nationalsPostiveNo,greenPositiveNo,laborPositiveNo,liberalPositiveNo,nationalsNegativeNo,greenNegativeNo,laborNegativeNo,liberalNegativeNo,
            nationalsNeutralNo,greenNeutralNo,laborNeutralNo,liberalNeutralNo;
        _.forEach(results, function(publicTweetsInfo) {
            var publicTweetsParty = publicTweetsInfo.key[0];
            var publicTweetsSen = publicTweetsInfo.key[1];
            var tweetsNo = publicTweetsInfo.value;
             if(publicTweetsSen == 'positive'){
                switch (publicTweetsParty){
                    case null:
                         nationalsPostiveNo = tweetsNo;
                         break;
                    case 'green':
                         greenPositiveNo = tweetsNo;
                         break;
                    case 'labor':
                         laborPositiveNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalPositiveNo = tweetsNo;
                          break;
                }

            }else if(publicTweetsSen == 'negative'){
                switch (publicTweetsParty){
                    case null:
                         nationalsNegativeNo = tweetsNo;
                         break;
                    case 'green':
                         greenNegativeNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNegativeNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNegativeNo = tweetsNo;
                          break;
                }


            }else{
                switch (publicTweetsParty){
                    case null:
                         nationalsNeutralNo = tweetsNo;
                         break;
                    case 'green':
                         greenNeutralNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNeutralNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNeutralNo = tweetsNo;
                          break;

                    }
                }
        });
        
       // var liberalPositivePro = liberalPositiveNo / (liberalPositiveNo + liberalNegativeNo);
        //var laborPositivePro = laborPositiveNo / (laborPositiveNo + laborNegativeNo);
        var greenPositivePro = greenPositiveNo / (greenPositiveNo + greenNegativeNo + greenNeutralNo);
        //var nationalsPostivepro = nationalsPostiveNo/ (nationalsPostiveNo + nationalsNegativeNo);
        //var liberalNegativePro = liberalNegativeNo / (liberalPositiveNo + liberalNegativeNo);
        //var laborNegativePro = laborNegativeNo / (laborPositiveNo + laborNegativeNo);
        var greenNegativePro = greenNegativeNo / (greenPositiveNo + greenNegativeNo + greenNeutralNo);
        var greenNeutralPro = greenNeutralNo / (greenPositiveNo + greenNegativeNo + greenNeutralNo);
        //var nationalsNegativepro = nationalsNegativeNo/ (nationalsPostiveNo + nationalsNegativeNo);
        //var positiveTotalNo = liberalPositiveNo + laborPositiveNo + greenPositiveNo+ nationalsPostiveNo;
        //var negtiveTotalNo =liberalNegativeNo + laborNegativeNo+ greenNegativeNo+ nationalsNegativeNo;
        //var totalNo = positiveTotalNo + negativeTotalNo;
        //var postiveTotalPro = positiveTotalNo / totalNo;
        //var negativeTotalPro =negtiveTotalNo / totalNo;
        $('#publicTweetsSentimentGreen').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Tweets Sentiment(Green)'
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
                name: 'Tweet Sentiment',
                data: [
                    ['Positive',   greenPositivePro],
                    ['negative',       greenNegativePro],
                    ['neutral', greenNeutralPro]
                ]
            }]
        });
    });

});
//********************************************public tweets sentiment of all politicians****************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentiment",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var nationalsPostiveNo,greenPositiveNo,laborPositiveNo,liberalPositiveNo,nationalsNegativeNo,greenNegativeNo,laborNegativeNo,liberalNegativeNo,
            nationalsNeutralNo,greenNeutralNo,laborNeutralNo,liberalNeutralNo;
        _.forEach(results, function(publicTweetsInfo) {
            var publicTweetsParty = publicTweetsInfo.key[0];
            var publicTweetsSen = publicTweetsInfo.key[1];
            var tweetsNo = publicTweetsInfo.value;
            if(publicTweetsSen == 'positive'){
                switch (publicTweetsParty){
                    case null:
                         nationalsPostiveNo = tweetsNo;
                         break;
                    case 'green':
                         greenPositiveNo = tweetsNo;
                         break;
                    case 'labor':
                         laborPositiveNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalPositiveNo = tweetsNo;
                          break;
                }

            }else if(publicTweetsSen == 'negative'){
                switch (publicTweetsParty){
                    case null:
                         nationalsNegativeNo = tweetsNo;
                         break;
                    case 'green':
                         greenNegativeNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNegativeNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNegativeNo = tweetsNo;
                          break;
                }


            }else{
                switch (publicTweetsParty){
                    case null:
                         nationalsNeutralNo = tweetsNo;
                         break;
                    case 'green':
                         greenNeutralNo = tweetsNo;
                         break;
                    case 'labor':
                         laborNeutralNo = tweetsNo;
                         break;
                    case 'liberal':
                          liberalNeutralNo = tweetsNo;
                          break;

                    }
                }
        });
        
       // var liberalPositivePro = liberalPositiveNo / (liberalPositiveNo + liberalNegativeNo);
       // var laborPositivePro = laborPositiveNo / (laborPositiveNo + laborNegativeNo);
       // var greenPositivePro = greenPositiveNo / (greenPositiveNo + greenNegativeNo);
        var nationalsPostivepro = nationalsPostiveNo/ (nationalsPostiveNo + nationalsNegativeNo + nationalsNeutralNo);
       // var liberalNegativePro = liberalNegativeNo / (liberalPositiveNo + liberalNegativeNo);
       // var laborNegativePro = laborNegativeNo / (laborPositiveNo + laborNegativeNo);
       // var greenNegativePro = greenNegativeNo / (greenPositiveNo + greenNegativeNo);
        var nationalsNegativepro = nationalsNegativeNo/ (nationalsPostiveNo + nationalsNegativeNo +nationalsNeutralNo );
        var nationalsNeutralPro =nationalsNeutralNo / (nationalsPostiveNo + nationalsNegativeNo +nationalsNeutralNo );
       // var positiveTotalNo = liberalPositiveNo + laborPositiveNo + greenPositiveNo+ nationalsPostiveNo;
       // var negtiveTotalNo =liberalNegativeNo + laborNegativeNo+ greenNegativeNo+ nationalsNegativeNo;
       // var totalNo = positiveTotalNo + negativeTotalNo;
       // var postiveTotalPro = positiveTotalNo / totalNo;
        //var negativeTotalPro =negtiveTotalNo / totalNo;
        $('#publicTweetsSentimentNationals').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
                plotShadow: false
            },
            title: {
                text: 'Tweets Sentiment(Nationals)'
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
                name: 'Tweet Sentiment',
                data: [
                    ['Positive',   nationalsPostivepro],
                    ['negative',       nationalsNegativepro],
                    ['neutral',  nationalsNeutralPro]
                ]
            }]
        });
    });

});