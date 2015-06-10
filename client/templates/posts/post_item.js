Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },

  notOwnPost: function(){
  	return this.userId !== Meteor.userId();
  }
});

Template.postItem.events({
	'click .msg': function(e){
		e.preventDefault()
		Session.set('currentId',this.userId);
        var res=ChatRooms.findOne({chatIds:{$all:[this.userId,Meteor.userId()]}});
        console.log(res)
        if(res) {
            //already room exists
            Session.set("roomid",res._id);
        } else {
            //no room exists
            var newRoom= ChatRooms.insert({
            	chatIds:[this.userId , Meteor.userId()],
            	title: this.title,
            	price: this.price,
            	messages:[]
            });
            Session.set('roomid',newRoom);
             

        }
        Router.go('chatRoom', {_id: Session.get('roomid')})
	},

	'click .watch' : function(e){
		e.preventDefault();
		console.log(this);
	}
});

