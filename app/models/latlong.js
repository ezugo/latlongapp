// This file contains the model for the rewards program catalog

// Load required packages
var mongoose = require('mongoose');

// Define our giftcard model. 
//  --  The rewards related attributes would have dummy values in the rewards program catalogue and would be generated 
//      when the purchase is made based on the rewards program from which hte card is being purchased
// Here, we create a Mongoose schema which maps to a MongoDB collection and defines the shape of the 
// documents within the collection
var LatLongSchema = new mongoose.Schema({	
	lat: Number, 
	long: Number,
	image_url: String
});

// Export the mongoose model
module.exports = mongoose.model('latlong', LatLongSchema);