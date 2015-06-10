Deps.autorun(function(){
    Meteor.subscribe("chatrooms");
});

Template.messages.helpers({
    'msgs':function(){
        var result = ChatRooms.findOne({_id:Session.get('roomid')});
        
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
                var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                 name: name,
                 text: message.value,
                 createdAt: Date.now()
                }}});
                document.getElementById('message').value = '';
                message.value = '';
              }
        }
        else
        {
           alert("login to chat");
        }
       
    }
  }
}


// Template.chatSubmit.helpers({
  // errorMessage: function(field) {
  //   return Session.get('postSubmitErrors')[field];
  // },
  // errorClass: function (field) {
  //   return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  // }
// });

// Template.chatSubmit.events({
//   'submit form': function(e) {
//     e.preventDefault();

//     console.log(this)

//     var message = {
//       productId: this._id,
//       sellerId: this.userId,
//       sellerUserName: this.author,	
//       body: $(e.target).find('[name=message]').val()
//     };

//     var errors = validateMsg(message);
//     if (errors.msg)
//     	console.log(errors);

//     Meteor.call('chatInsert', message, function(error, result) {
//       // display the error to the user and abort
//       if (error)
//          return throwError(error.reason);
//      else {
//      	console.log(result)
//      }
//     });
//   }
// });