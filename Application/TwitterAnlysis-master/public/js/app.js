App = Ember.Application.create();


App.ApplicationAdapter = DS.RESTAdapter;
App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

App.Router.map(function() {
  // put your routes here
    this.route('partyMembers');
    this.route('politicianDetail', { path:'/politician/:politician_id'});
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('partyMembers');
    }
});


App.PoliticianDetailRoute = Ember.Route.extend({
    model: function(params) {
    	 console.log("params la:", params);
       return this.store.find('politician', params.politician_id);
    }
});

App.PartyMembersRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('politician');
    },
    setupController: function(controller, model) {
    	controller.set('model', model);
    	var laborList, liberalList, greenList, nationList;
    	laborList = model.filterProperty('party', 'labor');
    	liberalList = model.filterProperty('party', 'liberal');
    	greenList = model.filterProperty('party', 'green');
    	nationList = model.filterProperty('party', 'nationals');

    	controller.set('laborList', laborList);
    	controller.set('liberalList', liberalList);
    	controller.set('greenList', greenList);
    	controller.set('nationList', nationList);
  	}
});


//var showdown = new Showdown.converter();

//Ember.Handlebars.helper('format-markdown', function(input) {
//    return new Handlebars.SafeString(showdown.makeHtml(input));
//});

Ember.Handlebars.helper('format-number', function(number) {
    if(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return '0';
    }
});

Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
});

