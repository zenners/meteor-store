Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

// fade effect for upper right hand err msg
Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
});