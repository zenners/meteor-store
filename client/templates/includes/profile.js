Template.profile.events({
	'click .profile': function(e){
		e.preventDefault();
		Router.go('userProfile', {_id: Meteor.userId()});
	}
});

Template.messagesNav.events({
	'click .messages': function(e){
		e.preventDefault();
		Router.go('chatList', {_id: Meteor.userId()});
	}
})