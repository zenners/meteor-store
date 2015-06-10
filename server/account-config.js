//modify Accounts package here

Accounts.onCreateUser(function(options, user){
	// add other fields to user document
	user.rating = 0;

	if (options.profile)
    	user.profile = options.profile;
	return user;
})