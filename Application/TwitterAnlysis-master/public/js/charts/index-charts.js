// *********************************** Party Distro *******************************************

    $(function() {

        $(document).ready(function() {

            var jsonData = $.ajax({
                url: "/partyDistro",
                dataType: "json",
                async: false
            }).responseText;

            var results = jQuery.parseJSON(jsonData);
            var laborProp, liberalProp, nationalProp, greenProp;

            _.forEach(results, function(party) {
                var partyName = party.key.toUpperCase();
                var politiciansNo = party.value;
                switch (partyName) {
                    case 'LABOR':
                        laborProp = politiciansNo / 55;
                        $('#laborPoliticianNo').text(politiciansNo)
                        break;
                    case 'LIBERAL':
                        liberalProp = politiciansNo / 55;
                        $('#liberalPoliticianNo').text(politiciansNo)
                        break;
                    case 'NATIONALS':
                        nationalProp = politiciansNo / 55;
                        $('#nationalPoliticianNo').text(politiciansNo)
                        break;
                    case 'GREEN':
                        greenProp = politiciansNo / 55;
                        $('#greenPoliticianNo').text(politiciansNo)
                        break;
                }
            });

            // Build the chart
            $('#partyDistro').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
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
                    name: 'Browser share',
                    data: [
                        ['Labor', laborProp],
                        ['Liberal', liberalProp],
                        ['National', nationalProp],
                        ['Green', greenProp],
                        ['IND', 0.0]
                    ]
                }]
            });

        });
    });

// *********************************** Politician Tweets Leaderboard *******************************************

    $(function() {

        $(document).ready(function() {

            var jsonData = $.ajax({
                url: "/tweetsCounts",
                dataType: "json",
                async: false
            }).responseText;

            var results = jQuery.parseJSON(jsonData);
            var counter = 0;
            _.forEach(_.initial(results, 5), function(polTweetsInfo) {
                counter++;
                var tweetsNo = polTweetsInfo.key;
                var polName = polTweetsInfo.value.name.substring(0, 13);
                var polParty = polTweetsInfo.value.party;
                polParty = polParty.charAt(0).toUpperCase() + polParty.slice(1);
                $("#polTweetsLeaderBoard").append(
                    "<tr><td>"+counter+"</td> \
                    <td>"+polName+"</td> \
                    <td>"+polParty+"</td> \
                    <td>"+tweetsNo+"</td></tr>");
            });

        });
    });


// ******************************** VISITS  ********************************************
    $(function(){
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


                var datasets = {
                    "liberal": {
                        label: "liberal",
                        data: liberalTweetTimeList
                           
                    },
                    "labor": {
                        label: "labor",
                        data:laborTweetTimeList
                    },
                    "nationals": {
                        label: "nationals",
                        data: greenTweetTimeList
                        
                    },
                    "green": {
                        label: "green",
                        data: nationalsTweetTimeList
                    }

                };

                // hard-code color indices to prevent them from shifting as
                // countries are turned on/off
                var i = 0;
                $.each(datasets, function(key, val) {
                    val.color = i;
                    ++i;
                });

                // insert checkboxes 
                var choiceContainer = $("#choices");
                $.each(datasets, function(key, val) {
                    choiceContainer.append('<input type="checkbox" style="float:left;margin-left:5px" name="' + key +
                        '" checked="checked" id="id' + key + '">' +
                        '<label style="float:left; margin:0 15px 5px; color:#777777;" for="id' + key + '">' + val.label + '</label>');
                });
                choiceContainer.find("input").click(plotAccordingToChoices);


                function plotAccordingToChoices() {
                    var data = [];

                    choiceContainer.find("input:checked").each(function() {
                        var key = $(this).attr("name");
                        if (key && datasets[key])
                            data.push(datasets[key]);
                    });

                    if (data.length > 0)
                        $.plot($("#placeholder"), data, {
                            yaxis: {
                                min: 0,
                            },
                            xaxis: {
                                tickDecimals: 0
                            }
                        });
                }

                plotAccordingToChoices();

        });
        
    });




