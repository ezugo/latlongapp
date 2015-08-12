// Load the latlong program catalog "model" file 
var LatLongProgram = require('../models/latlong');
var url = require('url');

// Create the endpoint /api/listoflatlong for POSTS
exports.postLatLongProgram = function(req, res){

	// Create a new instance of the latlong program model
	var latlongprogram = new LatLongProgram();

	// Set the latlong properties that came from the POST data
	latlongprogram.lat = req.body.lat;
	latlongprogram.long = req.body.long;
	latlongprogram.image_url = req.body.image_url;
	

	// Save the new latlong entries and check for errors. So we call "save" on the latlong model. 
	// This is a Mongoose function that will save the model to the MongoDB database
	latlongprogram.save(function(err){
		if (err) {
			// duplicate entry
			if (err.code == 11000) 
				return res.json({ success: false, message: 'A lat/long with that exact location already exist. '});
			else 							
				return res.send(err);
			}

			// return a message
			res.json({ message: 'Lat Long Location Entry created!' });
		});
};

// create an endpoint for /api/listoflatlong for GET (i.e entire list of lat longs) for GET
exports.getLatLongPrograms = function(req, res){
	LatLongProgram.find(function(err, latlongs){
		if(err)
			res.send(err);

		res.json(latlongs);
	});
};

// Create endpoint /api/listoflatlong/:listoflatlong_id for GET
exports.getLatLongProgram = function(req, res){
	// Use the RewardsProgram model to find a specific rewards program
	LatLongProgram.findById(req.params.listoflatlong_id, function(err, latlongs){
		if(err)
			res.send(err);

		res.json(latlongs);
	});

};

// Create endpoint /api/listoflatlong/:listoflatlong_id
exports.putLatLongProgram = function(req, res){
	// Use the latlong model to find a specific latlong entry
	LatLongProgram.findById(req.params.listoflatlong_id, function(err, latlongs){
		if(err)
			res.send(err);

		// update the existing latlong
		latlongs.lat = req.body.lat;
		latlongs.long = req.body.long;
		latlongs.image_url = req.body.image_url;		
		
		// Save the rewards program and check for errors
		latlongs.save(function(err){
			if(err)
				res.send(err);
				// return a message
				res.json({ message: 'The requested latlong entry has been updated!' });
//			res.json(rewardsprogram);
		});
	});
};


// Create endpoint /api/listoflatlong/:listoflatlong_id for DELETE
exports.deleteLatLongProgram = function(req, res){
	// Use the latlong model to find a specific latlong entry and remove it
	LatLongProgram.findByIdAndRemove(req.params.listoflatlong_id, function(err){
		if(err)
			res.send(err);

		res.json({message: 'The requested latLong entry has been removed from the database!'});
	});
};