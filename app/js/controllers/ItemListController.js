

angular.module('drawApp.controller')
.controller('ItemListCtrl',
    function($scope, $http) {
        $http.get('partials/graphItem.json').success(function(data) {
            $scope.items = data;
        });
    }
);
