'use strict';

angular.module('tilosApp').config(function ($routeProvider) {
    $routeProvider.when('/show/:id', {
        templateUrl: 'partials/show.html',
        controller: 'ShowCtrl'
    }).when('/show/:id/intro', {
        templateUrl: 'partials/show-intro.html',
        controller: 'ShowIntroCtrl'
    }).when('/show/:id/mixes', {
        templateUrl: 'partials/show-mixes.html',
        controller: 'ShowMixesCtrl'
    }).when('/show/:id/bookmarks', {
        templateUrl: 'partials/show-bookmarks.html',
        controller: 'ShowBookmarksCtrl'
    });
});

angular.module('tilosApp')
    .controller('ShowIntroCtrl', function ($scope, $routeParams, API_SERVER_ENDPOINT, $http) {
        $http.get(API_SERVER_ENDPOINT + '/api/v1/show/' + $routeParams.id, {cache: true}).success(function (data) {
            $scope.show = data;
        });
    });

angular.module('tilosApp')
    .controller('ShowMixesCtrl', function (Player, $scope, $routeParams, API_SERVER_ENDPOINT, $http, validateUrl, $rootScope, $location, Meta) {
        $http.get(API_SERVER_ENDPOINT + '/api/v1/show/' + $routeParams.id, {cache: true}).success(function (data) {
            $scope.show = data;
        });
        $http.get(API_SERVER_ENDPOINT + '/api/v1/mix?show=' + $routeParams.id, {cache: true}).success(function (data) {
            $scope.mixes = data;
        });
    });

angular.module('tilosApp')
    .controller('ShowBookmarksCtrl', function (Player, $scope, $routeParams, API_SERVER_ENDPOINT, $http, validateUrl, $rootScope, $location, Meta) {
        $http.get(API_SERVER_ENDPOINT + '/api/v1/show/' + $routeParams.id, {cache: true}).success(function (data) {
            $scope.show = data;
        });
    });

angular.module('tilosApp')
    .controller('ShowCtrl', function (Player, $scope, $routeParams, API_SERVER_ENDPOINT, $http, validateUrl, $rootScope, $location, Meta) {
        $http.get(API_SERVER_ENDPOINT + '/api/v1/show/' + $routeParams.id, {cache: true}).success(function (data) {
            $scope.show = data;
            $scope.server = API_SERVER_ENDPOINT;
            Meta.setTitle(data.name);
            Meta.setDescription(data.definition);

            $scope.show.sharecount = 0;
            $scope.likeURL = validateUrl.getValidUrl('http://www.facebook.com/plugins/like.php?href=http%3A%2F%2F' + tilosHost + '%2Fshow%2F' + $scope.show.alias + '&width&layout=standard&action=like&show_faces=true&share=true');

            $scope.currentShowPage = 0;


            var to = new Date().getTime() / 1000;
            var from = to - ( 6 * 30 * 24 * 3600);
            $http.get(API_SERVER_ENDPOINT + '/api/v0/show/' + data.id + '/episodes?from=' + from + "&to=" + to).success(function (data) {
                $scope.show.episodes = data;
            });

            $scope.play = Player.play;

            $scope.prev = function () {
                $scope.currentShowPage--;
                var to = $scope.show.episodes[$scope.show.episodes.length - 1].plannedFrom - 60;
                var from = to - 60 * 24 * 60 * 60;
                $http.get(API_SERVER_ENDPOINT + '/api/v0/show/' + data.id + '/episodes?from=' + from + "&to=" + to).success(function (data) {
                    $scope.show.episodes = data;
                });

            };
            $scope.next = function () {
                $scope.currentShowPage++;
                var from = $scope.show.episodes[0].plannedTo + 60;
                var to = from + 60 * 24 * 60 * 60;
                $http.get(API_SERVER_ENDPOINT + '/api/v0/show/' + data.id + '/episodes?from=' + from + "&to=" + to).success(function (data) {
                    $scope.show.episodes = data;
                });
            };

            $http.get('https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27http%3A%2F%2F' + API_SERVER_ENDPOINT + "2Fshow%2F" + $scope.show.alias + "%27", {cache: true}).success(function (data) {
                if (data.data[0] !== undefined) {
                    $scope.show.sharecount = data.data[0].share_count;
                }
            });
        });

    }
);
