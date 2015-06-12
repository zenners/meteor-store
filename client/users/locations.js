Template.locations.onRendered(function() {
	var map = L.map('map').setView([12.75, 122.73], 5);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'josephchan.eb78d81f',
    accessToken: 'pk.eyJ1Ijoiam9zZXBoY2hhbiIsImEiOiJlYzUwZjA5MmUzYmQ2YTEzMDRhZDAxOTcyYTk5NzI0NyJ9.CPsiXCDzybFMiovFvEgA-g'
	}).addTo(map);
});	