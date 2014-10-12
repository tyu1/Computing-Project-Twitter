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

// App.DashboardRoute = Ember.Route.extend({
//   beforeModel: function() {
//   	 console.log("I enter Index route");
//      this.transitionTo('/');
//    }
// });

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