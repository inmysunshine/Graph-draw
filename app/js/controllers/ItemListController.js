

angular.module('drawApp.controller')
.controller('ItemListCtrl',
    function($scope, $http) {
        $http.get('data/graphItem.json').success(function(data) {
            $scope.items = data;
        });
    }
);
