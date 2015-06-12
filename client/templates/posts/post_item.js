Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  // can't do !ownPost in Blaze?, prevent user from sending message to self
  notOwnPost: function(){
  	return this.userId !== Meteor.userId();
  }
});

Template.postItem.events({
	//Send a msg to the seller
	'click .msg': function(e){
		e.preventDefault();

		Session.set('currentId',this.userId);
        var res = ChatRooms.findOne({postId: this._id}, {chatIds:{ $all:[this.userId,Meteor.userId()]}, 
        });
  
        if(res) {
            // room exists
            Session.set("roomid",res._id);
        } else {
            //no room exists (this.user is seller, Meteor.user is buyer)
            var newRoom= ChatRooms.insert({
            	chatIds:[this.userId , Meteor.userId()],
              postId: this._id,
            	title: this.title,
            	price: this.price,
            	messages:[]
            });
            Session.set('roomid',newRoom);
             
        }

        //open chatroom
        Router.go('chatRoom', {_id: Session.get('roomid')})
	},
	//WIP watchlist
	'click .watch' : function(e){
		e.preventDefault();
		console.log(this);
	}
});

