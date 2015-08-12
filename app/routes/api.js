var bodyParser = require('body-parser'); 	// get body-parser
var config     = require('../../config');
// Load the rewards program catalog "controller" file 
var latlongController = require('../routes/latlong');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// Create end point handler for "/listoflatlong"  
	apiRouter.route('/listoflatlong')
		.post(latlongController.postLatLongProgram)
		.get(latlongController.getLatLongPrograms);

	// Create end point handlers for /listoflatlong/:listoflatlong_id prefix
	apiRouter.route('/listoflatlong/:listoflatlong_id')
		.get(latlongController.getLatLongProgram)
		.put(latlongController.putLatLongProgram)
		.delete(latlongController.deleteLatLongProgram);

	return apiRouter;
};