if (Posts.find().count() === 0) {
	Posts.insert({
		title: 'Macbook',
		description: 'Great condition 2009 Macbook Pro',
		price: 199,
	});
	Posts.insert({
		title: 'iPhone 5S',
		description: 'Great condition iPhone 5S',
		price: 299,
	});
	Posts.insert({
		title: 'iPad 2',
		description: 'Great condition iPad2',
		price: 199,
	});
}