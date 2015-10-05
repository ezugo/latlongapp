// angular.module('module name', [array describing module dependencies]). 
// Modules are containers so that the code we write does not end up in the global namspace
// By putting controllers in a module, you avoid the global namespace. If it's in the global namespace,
// identifiers could leak out and clutter other code

angular.module('latlongCtrl', ['latlongService'])

// Register your controllers with this module. 
// ./controller('name of controller', function used for this controller)
.controller('latlongController', function(LatLongProgram) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the latlong at page load
	LatLongProgram.all()
		.success(function(data) {

			// when all the latlongs come back, remove the processing variable
			vm.processing = false;

			// bind the latlongs that come back to vm.latlongdata
			vm.getAllLatLongData = data;
		});

	// function to delete a latlongs
	vm.deleteLatLong = function(id) {
		vm.processing = true;

		LatLongProgram.delete(id)
			.success(function(data) {

				// get all lallongs to update the table
				// you can also set up your api 
				// to return the list of latlongs with the delete call
				LatLongProgram.all()
					.success(function(data) {
						vm.processing = false;
						vm.getAllLatLongData = data;
					});

			});
	};

})

// controller applied to lat long creation page
.controller('latlongCreateController', function(LatLongProgram) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a latlong
	vm.saveLatLong = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the latlongService
		LatLongProgram.create(vm.latlongprogramData)
			.success(function(data) {
				vm.processing = false;
				vm.latlongprogramData = {};
				vm.message = data.message;
			});
			
	};	

})

// controller applied to latlong edit page
.controller('latlongEditController', function($routeParams, LatLongProgram) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the latlong data for the latlong you want to edit
	// $routeParams is the way we grab data from the URL
	LatLongProgram.get($routeParams.listoflatlongs_id)
		.success(function(data) {
			vm.latlongprogramData = data;
		});

	// function to save the latlong
	vm.saveLatLong = function() {
		vm.processing = true;
		vm.message = '';

		// call the latlongService function to update 
		LatLongProgram.update($routeParams.listoflatlongs_id, vm.latlongprogramData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.latlongprogramData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				
			});
			
	};

});