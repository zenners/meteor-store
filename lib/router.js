Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('posts'); },

});

//post routes
Router.route('/', {name: 'postsList'}); 

Router.route('/posts/:_id', {
	name: 'postPage',
	data: function(){
		return Posts.findOne(this.params._id)
	}
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {
	name: 'postSubmit'
});

//chat routes
Router.route('/messages/:_id',{
	name: 'chatList',
	waitOn: function() { return Meteor.subscribe('chatrooms'); },
	data: function(){
		return {list: ChatRooms.find({chatIds:this.params._id})}
	}
});	

Router.route('/chats/:_id', {
	name: 'chatRoom',
	waitOn: function() { return Meteor.subscribe('chatrooms'); },
	data: function(){
		return ChatRooms.findOne(this.params._id)
	}
});

//user routes
Router.route('/users/:_id', {
	name:'userProfile',
	waitOn: function(){
		return Meteor.subscribe('userData')
	},
	data: function(){
		return Meteor.users.findOne(this.params._id)
	}
})


var requireLogin = function() {
   if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'chatRoom']})