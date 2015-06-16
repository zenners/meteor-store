Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  'insert':function(userId,doc){
     return true;
  },
  update: function(userId, doc, fieldNames) {
    return true;
  }
});

Meteor.methods({
  updateRead: function(theChatId){
    check(theChatId, String)
    Notifications.update({chatId: theChatId}, {$set: {read: true}}, {multi: true})

  }
})

createMessageNotification = function(chat) {
  check(chat, Match.Any)
  var post = Posts.findOne(chat.postId);
  var senderId = chat.chatIds.filter(function(id){
    return id == Meteor.userId()
  });
  var recipientId = chat.chatIds.filter(function(id){
    return id != Meteor.userId()
  });
  var messages = chat.messages;

  //only does buyer to seller
  if (senderId[0] == Meteor.userId()) {
    console.log('creating notification')
    Notifications.insert({
      userId: recipientId[0],
      chatId: chat._id,
      postId: post._id,
      senderId: senderId[0],
      senderName: messages[messages.length-1].name,
      read: false
    }, function(err, res){
      if (err)
        console.log(err)
    });
  } else {
    console.log('error!')
  }
};