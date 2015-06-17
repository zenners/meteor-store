Template.userProfile.events({
	'click .locations': function(e){
		e.preventDefault();
		Router.go('locations', {_id: Meteor.userId()});
	}
});