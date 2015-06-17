Template.locations.onRendered(function() {
  Meteor.typeahead.inject();

	var map = L.map('map').setView([12.75, 122.73], 5);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'josephchan.eb78d81f',
    accessToken: 'pk.eyJ1Ijoiam9zZXBoY2hhbiIsImEiOiJlYzUwZjA5MmUzYmQ2YTEzMDRhZDAxOTcyYTk5NzI0NyJ9.CPsiXCDzybFMiovFvEgA-g'
	}).addTo(map);
});	

var searchLocations = function(query, sync, callback) {
  Meteor.call('searchLocations', query, {}, function(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    suggestions = res.data.map(function(v){ return {value: v.display_name}; })
    callback(suggestions);
  });
}

Template.locationFields.helpers({
	searchHomeLocations: function(query, sync, callback) {
		searchQuery = $(document).find('[name=home-location]').val();
		searchLocations(searchQuery, sync, callback);
	},
  searchWorkLocations: function(query, sync, callback) {
    searchQuery = $(document).find('[name=work-location]').val();
    searchLocations(searchQuery, sync, callback);
  },
});

Template.locationFields.events({
  'submit form': function(e) {
    e.preventDefault();
  }
});
