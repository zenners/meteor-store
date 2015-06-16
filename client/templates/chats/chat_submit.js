Template.chatList.helpers({
  chat: function(){
    return ChatRooms.find({chatIds: Meteor.userId()})
  },
  sender: function(){
    var chat = ChatRooms.findOne({_id: this._id})

    var senderId = chat.chatIds.filter(function(id){
      return id != Meteor.userId();
    });
    var sender = Meteor.users.findOne(senderId[0]);
    return sender.username
  }
});

Template.chatList.events({
  'click .chatLink': function(e){
    e.preventDefault();
    console.log(this._id)
    Router.go('chatRoom', {_id: this._id});
  }
})

var foo = 0;
Template.messages.helpers({
  'msgs':function(){
      
      var result = ChatRooms.findOne({_id: this._id});
    
      return result.messages;
  }
});

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { 
        if (Meteor.user())
        {
              var name = Meteor.user().username;
              var message = document.getElementById('message');
    
              if (message.value !== '') {
                var de = ChatRooms.update({"_id": this._id},{$push:{messages:{
                 name: name,
                 text: message.value,
                 createdAt: Date.now()
                }}});

                document.getElementById('message').value = '';
                message.value = '';

                // refactor to return ChatRoom document from de instead of another query
                var chatpass = ChatRooms.findOne(this._id);
                createMessageNotification(chatpass);
              }
        }
        else
        {
           alert("login to chat");
        }
       
    }
  }
}

