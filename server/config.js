Cloudinary.config({
    cloud_name: 'zenners',
    api_key: '168762258649847',
    api_secret: 'IXFNePgn1a4ikw_ILhtQgeQ-vo0'
});

Accounts.onCreateUser(function(options, user){
	// add other fields to user document here
	user.rating = 0;

	if (options.profile)
    	user.profile = options.profile;
	return user;
})