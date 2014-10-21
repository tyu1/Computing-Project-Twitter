//*************************************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentimentTimeChange",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        var positiveArr= [];
        var negativeArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === 'labor' && tweetDate != '2007'){
                switch (tweetSentiment){
                    case 1:
                       positiveArr.push(tweetNo);
                       break;

                    case 0:
                       negativeArr.push(tweetNo);
                       break;
                }

            }
           
        });

        var positiveProArr = [];
        var negativeProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]);
            positiveProArr.push(proPosVaule);
            negativeProArr.push(-proNegvalue);
        }
      
        $('#publicTweetsSentimentTimeChangeLabor').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude Changes From 2008 to 2014 (Labor)'
            },
            xAxis: {
                categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'negtive',
                data: negativeProArr
            }]
        });
    });
});
//*************************************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentimentTimeChange",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        var positiveArr= [];
        var negativeArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === 'liberal'){
                switch (tweetSentiment){
                    case 1:
                       positiveArr.push(tweetNo);
                       break;

                    case 0:
                       negativeArr.push(tweetNo);
                       break;
                }

            }
           
        });
        var positiveProArr = [];
        var negativeProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]);
            positiveProArr.push(proPosVaule);
            negativeProArr.push(-proNegvalue);
        }



        $('#publicTweetsSentimentTimeChangeLiberal').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude Changes From 2008 to 2014 (Liberal)'
            },
            xAxis: {
                categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'negtive',
                data: negativeProArr
            }]
        });
    });
});
//*************************************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentimentTimeChange",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        var positiveArr= [];
        var negativeArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === 'green'){
                switch (tweetSentiment){
                    case 1:
                       positiveArr.push(tweetNo);
                       break;

                    case 0:
                       negativeArr.push(tweetNo);
                       break;
                }

            }
           
        });
        var positiveProArr = [];
        var negativeProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]);
            positiveProArr.push(proPosVaule);
            negativeProArr.push(-proNegvalue);
        }
        $('#publicTweetsSentimentTimeChangeGreen').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude Changes From 2008 to 2014 (Green)'
            },
            xAxis: {
                categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'negtive',
                data: negativeProArr
            }]
        });
    });
});
//*************************************************
$(function () {

    $(document).ready(function() {

        var jsonData = $.ajax({
            url: "/publicTweetsSentimentTimeChange",
            dataType: "json",
            async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var politiciansArr = [];
        var positiveArr= [];
        var negativeArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === null){
                switch (tweetSentiment){
                    case 1:
                       positiveArr.push(tweetNo);
                       break;

                    case 0:
                       negativeArr.push(tweetNo);
                       break;
                }

            }
           
        });
         var positiveProArr = [];
        var negativeProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]);
            positiveProArr.push(proPosVaule);
            negativeProArr.push(-proNegvalue);
        }
        $('#publicTweetsSentimentTimeChangeNationals').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude Changes From 2008 to 2014 (Nationals)'
            },
            xAxis: {
                categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'negtive',
                data: negativeProArr
            }]
        });
    });
});
//************************************************