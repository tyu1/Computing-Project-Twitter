App = Ember.Application.create();

App.Router.map(function() {
  // this.resource('partyMembers');
  this.route('dashboard', { path: "/" });
  this.route('partyMembers', { path: "/party-members.html" });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
  	console.log("I enter dashboard route");
    return ['red', 'yellow', 'blue'];
  }
});

App.PartyMembersRoute = Ember.Route.extend({
	model: function() {
		console.log("I fuck this up");
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