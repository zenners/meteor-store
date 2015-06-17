Meteor.methods({
    searchLocations: function(query, options) {
        check(query, String);
        check(options, Object);
        if (Meteor.isServer) {
            this.unblock();
            query = query.split(' ').join('%20');
            var response = HTTP.get("http://nominatim.openstreetmap.org/search/"+query,
                {params: {format:'json'}});
            return response;    
        }
    },

    saveLocations: function() {
        
    }
});