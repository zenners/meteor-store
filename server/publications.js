Meteor.publish('posts', function(){
	return Posts.find();
});

// publish chatrooms where the current user is a part of, seller or buyer
// can we filter array to look at specific index of chatIds to get threads where a user is either buyer or seller?
Meteor.publish("chatrooms",function(userId){
    return ChatRooms.find({chatIds: this.userId});
});

// pub/sub for User collection, add to fields obj if you want to a field visible on publish
Meteor.publish('userData', function(){
	if (this.userId){
		return Meteor.users.find({_id: this.userId},
								 {fields: {'rating': 1}});
	}
});

Meteor.publish('otherUsers', function(){
	return Meteor.users.find({});
})

// Cloudinary stuff
Meteor.methods({
    save_url:function(response){
        console.log('Add '+response.upload_data+' to the id of '+response.context);
    }
});