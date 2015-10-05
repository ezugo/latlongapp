angular.module('latlongService', [])

.factory('LatLongProgram', function($http) {

	// create a new object
	var latlongprogramFactory = {};

	// get a single latlong entry
	latlongprogramFactory.get = function(id) {
		return $http.get('/api/listoflatlong/' + id);
	};

	// get all latlong entries
	latlongprogramFactory.all = function() {
		return $http.get('/api/listoflatlong/');
	};

	// create a latlong entry
	latlongprogramFactory.create = function(latlongprogramData) {
		return $http.post('/api/listoflatlong/', latlongprogramData);
	};

	// update a latlong entry
	latlongprogramFactory.update = function(id, latlongprogramData) {
		return $http.put('/api/listoflatlong/' + id, latlongprogramData);
	};

	// delete a latlong entry
	latlongprogramFactory.delete = function(id) {
		return $http.delete('/api/listoflatlong/' + id);
	};

	// return our entire latlong object
	return latlongprogramFactory;

});