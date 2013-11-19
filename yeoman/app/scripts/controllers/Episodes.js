/**
* Get the episodes array
*/

/*global angular*/

angular.module('tilosApp')
	.controller('EpisodesCtrl', ['$scope', '$routeParams', 'API_SERVER_ENDPOINT', 'tilosData', '$http',
	function ($scope, $routeParams, $server, $td, $http) {
		'use strict';

		var nowDate = new Date();
		var start = (nowDate / 1000 - 60 * 60 * 3);
		var now = nowDate.getTime() / 1000;
		$scope.now = new Date();
		$http.get($server + '/api/episode?start=' + start + '&end=' + (start + 12 * 60 * 60)).success(function (data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].from <= now && data[i].to > now) {
					$scope.current = data[i];
				}
			}
			$scope.episodes = data;
		});
	}
]);