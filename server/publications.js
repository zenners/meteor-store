Meteor.publish('posts', function(){
	return Posts.find();
});


Meteor.publish("chatrooms",function(){
    return ChatRooms.find({});
});

// pub/sub for User collection, add to fields obj if you want to a field visible on publish
Meteor.publish('userData', function(){
	if (this.userId){
		return Meteor.users.find({_id: this.userId},
								 {fields: {'rating': 1}});
	}
})

// Cloudinary stuff
Meteor.methods({
    save_url:function(response){
        console.log('Add '+response.upload_data+' to the id of '+response.context);
    }
});