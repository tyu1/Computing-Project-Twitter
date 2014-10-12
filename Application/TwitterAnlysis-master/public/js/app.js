App = Ember.Application.create();
// App.ApplicationAdapter = DS.RESTAdapter;
App.Router.map(function() {
  // this.resource('partyMembers');
  this.route('dashboard', { path: "/" });
  this.route('partyMembers', { path: "/party-members" });
});


App.IndexRoute = Ember.Route.extend({
  model: function() {
  	console.log("I enter Index route");
    return ['red', 'yellow', 'blue'];
  }
});


App.DashboardRoute = Ember.Route.extend({
  beforeModel: function() {
     this.transitionTo('/');
   },
   afterModel: function() {
  	console.log("I enter DashboardRoute model");
    return ['red', 'yellow', 'blue'];
  }
});


$.ajax({
   url: '../dashboard.html',
   dataType: 'text',
   success: function (res) {
       App.DashboardView = Ember.View.extend({
           DashboardTemplate: Ember.Handlebars.compile(res),
           didInsertElement: function() {
           		debugger;
					    console.log("Enter didInsertElement ajax");
					    fuckAwsome();
					 }
       });
   }
});



$.ajax({
   url: '../party-members.html',
   dataType: 'text',
   success: function (res) {
       App.PartyMembersView = Ember.View.extend({
           PartyMembersTemplate: Ember.Handlebars.compile(res),
           didInsertElement: function() {
           		debugger;
					    console.log("Enter didInsertElement ajax");
					    fuckAwsome();
					 }
       });
   }
});


App.PartyMembersRoute = Ember.Route.extend({
	model: function() {
		console.log("I enter PartyMembers route");
		return people;
	}
});

var people = [{
	id: 1,
	name: 'derrick'
}, {
	id: 2,
	name: 'Andy'
}];




var fuckAwsome = function(){
	debugger;
	console.log("fuckAwsome fuckAwsome fuckAwsome Dunkey");
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
};