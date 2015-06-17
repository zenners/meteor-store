Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return [Meteor.subscribe('posts'), Meteor.subscribe('chatrooms'),  Meteor.subscribe('notifications')]; },
    'preload': {
        /*
         | Parameters can be a string (file path) or an array of strings
         */

        // Added in v1.2.1 - this one works only in Router.Configure!
        'verbose': true,  // Show loading messages in console

        // Custom time-out to replace internal 2 seconds
        'timeOut': 5000,    // milliseconds
    }    
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
	waitOn: function() { return [Meteor.subscribe('chatrooms'), Meteor.subscribe('otherUsers')]; },
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
});

LocationsController = PreloadController.extend({
    'preload': {
        'styles': 'http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css',
        'sync'  : 'http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js',
        'onSync': function ( filePath ) {
            var file = filePath.replace( /\?.*$/,"" ).replace( /.*\//,"" );
            switch ( file ) {
                case 'leaflet.js':
                        try {
                            return !!L;
                        } catch ( error ) {
                            return false;
                        }
                    break;
                default:
                    return true;
            }
        }        
    }  
});
Router.route('/locations/:_id',{
	name: 'locations',
	waitOn: function(){
		return Meteor.subscribe('userData')
    },
	data: function(){
		return Meteor.users.findOne(this.params._id)
	}    
});	


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