
// ******************************** VISITS  ********************************************
$(function () {
    var datasets = {
        "europe": {
            label: "Europe",
            data: [[1988, 290], [1989, 300], [1990, 450], [1991, 303], [1992, 420], [1993, 110], [1994, 250], [1995, 640], [1996, 290], [1997, 280], [1998, 380], [1999, 343], [2000, 443], [2001, 332], [2002, 233], [2003, 444], [2004, 454], [2005, 333], [2011, 343]]
        },        
        "united": {
            label: "United Stats",
            data: [[1988, 432], [1989, 54], [1990, 644], [1992, 433], [1993, 566], [1994, 664], [1995, 555], [1996, 455], [1997, 433], [1998, 344], [1999, 322], [2000, 234], [2001, 321], [2002, 445], [2003, 332], [2004, 653], [2005, 554], [2011, 221]]
        },
        "africa": {
            label: "Africa",
            data: [[1988, 754], [1989, 134], [1990, 555], [1991, 333], [1992, 433], [1993, 433], [1994, 455], [1995, 665], [1996, 333], [1997, 133], [1998, 344], [1999, 433], [2000, 556], [2001, 137], [2002, 345], [2003, 643], [2004, 765], [2005, 345], [2011, 543]]
        },
        "asie": {
            label: "Asie",
            data: [[1988, 454], [1989, 363], [1990, 746], [1991, 144], [1992, 233], [1993, 233], [1994, 344], [1995, 455], [1996, 566], [1997, 444], [1998, 142], [1999, 743], [2000, 464], [2001, 647], [2002, 322], [2003, 322], [2004, 432], [2005, 464], [2011, 765]]
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
                               '<label style="float:left; margin:0 15px 5px; color:#777777;" for="id' + key + '">'
                                + val.label + '</label>');
    });
    choiceContainer.find("input").click(plotAccordingToChoices);

    
    function plotAccordingToChoices() {
        var data = [];

        choiceContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && datasets[key])
                data.push(datasets[key]);
        });

        if (data.length > 0)
            $.plot($("#placeholder"), data, {
                yaxis: { min: 0, },
                xaxis: { tickDecimals: 0 }
            });
    }

    plotAccordingToChoices();


// *********************************** Party Distro *******************************************

 $(function () {

    $(document).ready(function () {

        var jsonData = $.ajax({
                url: "/partyDistro",
                dataType: "json",
                async: false
        }).responseText;

        var results = jQuery.parseJSON(jsonData);
        var laborProp, liberalProp, nationalProp, greenProp;
        $.each(results, function(index, party) {
            var partyName = party.key.toUpperCase();
            var politiciansNo = party.value; 
            switch(partyName) {
                case 'LABOR':
                    laborProp = politiciansNo / 55;
                    break;
                case 'LIBERAL':
                    liberalProp = politiciansNo / 55;
                    break;
                case 'NATIONALS':
                    nationalProp = politiciansNo / 55;
                    break;
                case 'GREEN':
                    greenProp = politiciansNo / 55;
                    break;
            } 
        });

        // Build the chart
        $('#earning').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Politician Distribution'
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
                    ['Labor',     laborProp],
                    ['Liberal',   liberalProp],
                    ['National',  nationalProp],
                    ['Green', greenProp],
                    ['IND', 0.0]
                ]
            }]
        });
    });

});

});

