angular.module('anytime', []);

angular.module('anytime').controller("MainController", ["$scope", function($scope) {
	$scope.environment = "on-my-way";

	var environment = location.search.substring(location.search.indexOf('=') + 1);

	if(environment.length !== 0)
		$scope.environment = environment;
}]);

angular.bootstrap(document, [ 'anytime' ]);