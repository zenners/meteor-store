Template.notifications.helpers({
  notifications: function() {
    var noti = Notifications.find({userId: Meteor.userId(), read: false});
    // var foo = noti.fetch().filter(function(item, pos){
    //   return noti.fetch().indexOf(item) == pos
    // });
    var foo = noti.fetch();
    var bar = _.uniq(foo, function(not){
      return not.chatId && not.senderId
    })
    return bar;
  },
  notificationCount: function(){
      var noti = Notifications.find({userId: Meteor.userId(), read: false})
      var foo = noti.fetch();
      var bar = _.uniq(foo, function(not){
        return not.chatId && not.senderId
      })

      return bar.length;
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.chatRoom.path({_id: this.chatId});
  }
});

Template.notificationItem.events({
  'click a': function() {
    Meteor.call('updateRead', this.chatId, function(error,res){
      if (error)
        return throwError(error.reason)
    }); 
  }
});