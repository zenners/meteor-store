ChatRooms = new Mongo.Collection('chatrooms');

Meteor.startup(function(){
	// moves these to meteor methods
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


// validateMsg = function (msg) {
//   var errors = {};
//   if (!msg.body)
//     errors.body = "Please say something";
  
//   return errors;
// }