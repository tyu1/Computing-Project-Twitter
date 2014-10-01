App = Ember.Application.create();


App.ApplicationAdapter = DS.RESTAdapter;
App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

App.Router.map(function() {
  // put your routes here
    this.route('politicianList');
    this.route('politicianDetail', { path:'/politician/:politician_id'});
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('politicianList');
    }
});


App.PoliticianDetailRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('politician', params.politician_id);
    }
});

App.PoliticianListRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('politician');
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