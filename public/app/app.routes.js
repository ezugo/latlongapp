angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})

		// show all latlongs
		.when('/listoflatlongs', {
			templateUrl: 'app/views/pages/latlongviews/all.html',
			controller: 'latlongController',
			controllerAs: 'mylatlongprogram'
		})

		// form to create a new latlongs
		// same view as edit page
		.when('/listoflatlongs/create', {
			templateUrl: 'app/views/pages/latlongviews/single.html',
			controller: 'latlongCreateController',
			controllerAs: 'mylatlongprogram'
		})

		// page to edit a latlongs
		.when('/listoflatlongs/:listoflatlongs_id', {
			templateUrl: 'app/views/pages/latlongviews/single.html',
			controller: 'latlongEditController',
			controllerAs: 'mylatlongprogram'
		});
		
	$locationProvider.html5Mode(true);

});
