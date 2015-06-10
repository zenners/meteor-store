ChatRooms = new Mongo.Collection('chatrooms');

Meteor.startup(function(){
   ChatRooms.allow({
        'insert':function(userId,doc){
            return true;
        },
        'update':function(userId,doc,fieldNames, modifier){
            return true;
        },
        'remove':function(userId,doc){
            return false;
        }
    }); 
});

// Meteor.methods({
// 	chatInsert: function(chatAttributes){
// 		check(Meteor.userId(), String)
// 		check(chatAttributes, {
// 			productId: String,
// 			sellerId: String,
// 			sellerUserName: String,
// 			body: String,
// 		});

// 		var user = Meteor.user()

// 		var chat = _.extend(chatAttributes,{
// 			buyerId: user._id,
// 			buyerName: user.username,
// 			submitted: new Date()
// 		});

// 		var chatId = Chats.insert(chat);
	    
// 	    return {
// 	      _id: chatId
//     	};

// 	}
// })

// validateMsg = function (msg) {
//   var errors = {};
//   if (!msg.body)
//     errors.body = "Please say something";
  
//   return errors;
// }