
// When adding oAuth grab usernames here.

Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.profile.name !== "undefined") {
        return user.profile.name;
    }
    return user.username;
});