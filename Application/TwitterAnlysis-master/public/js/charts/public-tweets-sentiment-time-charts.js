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
        var neutralArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === 'labor' && tweetDate != '2007' && tweetDate != '2008'){
                switch (tweetSentiment){
                    case 'positive':
                       positiveArr.push(tweetNo);
                       break;

                    case 'negative':
                       negativeArr.push(tweetNo);
                       break;
                    case 'neutral':
                        neutralArr.push(tweetNo);
                        break;

                }

            }
           
        });

        var positiveProArr = [];
        var negativeProArr = [];
        var neutralProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNeutral = neutralArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            positiveProArr.push(proPosVaule);
            neutralProArr.push(proNeutral);
            negativeProArr.push(-proNegvalue);
        }
      
        $('#publicTweetsSentimentTimeChangeLabor').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude On Labor Changes From 2009 tu 2014 (Labor)'
            },
            xAxis: {
                categories: ['2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'neutral',
                data: neutralProArr

            },
            {
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
        var neutralArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === 'liberal' && tweetDate != '2007' && tweetDate != '2008'){
                switch (tweetSentiment){
                    case 'positive':
                       positiveArr.push(tweetNo);
                       break;

                    case 'negative':
                       negativeArr.push(tweetNo);
                       break;
                    case 'neutral':
                        neutralArr.push(tweetNo);
                        break;

                }

            }
           
        });
        var positiveProArr = [];
        var negativeProArr = [];
        var neutralProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNeutral = neutralArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            positiveProArr.push(proPosVaule);
            neutralProArr.push(proNeutral);
            negativeProArr.push(-proNegvalue);
        }
      
        $('#publicTweetsSentimentTimeChangeLiberal').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude On Labor Changes From 2009 tu 2014 (liberal)'
            },
            xAxis: {
                categories: ['2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'neutral',
                data: neutralProArr

            },
            {
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
        var neutralArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === 'green' && tweetDate != '2007' && tweetDate != '2008'){
                switch (tweetSentiment){
                    case 'positive':
                       positiveArr.push(tweetNo);
                       break;

                    case 'negative':
                       negativeArr.push(tweetNo);
                       break;
                    case 'neutral':
                        neutralArr.push(tweetNo);
                        break;
                }

            }
           
        });
        var positiveProArr = [];
        var negativeProArr = [];
        var neutralProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNeutral = neutralArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            positiveProArr.push(proPosVaule);
            neutralProArr.push(proNeutral);
            negativeProArr.push(-proNegvalue);
        }
      
        $('#publicTweetsSentimentTimeChangeGreen').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude On Labor Changes From 2009 tu 2014 (Green)'
            },
            xAxis: {
                categories: ['2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'neutral',
                data: neutralProArr

            },
            {
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
        var neutralArr = [];
        _.forEach(results, function(tweetInfo) {
            var tweetDate = tweetInfo.key[0];
            var partyName = tweetInfo.key[1];
            var tweetSentiment = tweetInfo.key[2];
            var tweetNo = tweetInfo.value;
            if(partyName === null && tweetDate != '2007' && tweetDate != '2008'){
                switch (tweetSentiment){
                    case 'positive':
                       positiveArr.push(tweetNo);
                       break;

                    case 'negative':
                       negativeArr.push(tweetNo);
                       break;
                    case 'neutral':
                        neutralArr.push(tweetNo);
                        break;
                }

            }
           
        });
        var positiveProArr = [];
        var negativeProArr = [];
        var neutralProArr = [];
        for(var i = 0; i < positiveArr.length; i++){
            proPosVaule = positiveArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNegvalue = negativeArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            proNeutral = neutralArr[i] / (positiveArr[i]+negativeArr[i]+neutralArr[i]);
            positiveProArr.push(proPosVaule);
            neutralProArr.push(proNeutral);
            negativeProArr.push(-proNegvalue);
        }
      
        $('#publicTweetsSentimentTimeChangeNationals').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Public Attitude On Labor Changes From 2009 tu 2014 (Nationals)'
            },
            xAxis: {
                categories: [ '2009', '2010', '2011', '2012', '2013', '2014']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'positive',
                data: positiveProArr
            }, {
                name: 'neutral',
                data: neutralProArr

            },
            {
                name: 'negtive',
                data: negativeProArr
            }]
        });
    });
});
//************************************************
