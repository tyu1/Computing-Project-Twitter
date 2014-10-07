/**
 * Created by Noot on 18/05/2014.
 */

var attr = DS.attr;
var belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;
App.Politician = DS.Model.extend({
    name: attr('string'),
    screen_name: attr('string'),
    friends_count: attr('number'),
    followers_count: attr('number'),
    profile_image_url: attr('string'),
    party: attr('string'),
    created_at: attr('date'),
    description:attr('string'),
    statuses_count:attr('number'),
    detail_image_url: function() {
        return this.get('profile_image_url').replace('normal','400x400');
    }.property('profile_image_url'),
    relationship_url: function() {
        return 'relationship.html?screen_name=' + this.get('screen_name') + "&party=" + this.get('party');
    }.property('screen_name', 'party'),
    frequentWords_url: function() {
        return 'frequent_words_byname.html?screen_name=' + this.get('screen_name')+ "&name=" + this.get('name');
    }.property('screen_name', 'name'),
    frequentHashtags_url: function() {
        return 'frequent_hashtag_byname.html?screen_name=' + this.get('screen_name')+ "&name=" + this.get('name');
    }.property('screen_name', 'name'),
    mentionedPeople_url: function() {
        return 'metioned_people_byname.html?screen_name=' + this.get('screen_name')+ "&name=" + this.get('name');
    }.property('screen_name', 'name'),
    tweetTime_url: function() {
        return 'tweet_time_by_name_report.html?screen_name=' + this.get('screen_name')+ "&name=" + this.get('name');
    }.property('screen_name', 'name'),
    average_tweet: function() {
        var today = moment(new Date());
        var created = moment(this.get('created_at'));
        return   (this.get('statuses_count') / today.diff(created, 'days')).toFixed(2);
    }.property('created_at', 'statuses_count')
});
