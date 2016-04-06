angular.module('drawApp.controller3', [])
     .controller('IconCtrl', IconCtrl)
     .controller('DialogController', ['$scope', '$mdDialog', 'GraphService', DialogController]);

 function IconCtrl($scope, $mdDialog, $mdMedia, $http) {
     $scope.settingStatus = "";
     $scope.status = "";
     $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

     $scope.showPrompt = function(ev) {
         // Appending dialog to document.body to cover sidenav in docs app
         //console.log($rootScope.col);
         var confirm = $mdDialog.prompt()
             .title('输入要标记的节点号')
             .textContent('多个节点用空格间隔')
             .targetEvent(ev)
             .ok('确认')
             .cancel('取消');
         $mdDialog.show(confirm).then(function(result) {
             $scope.mark(result);
         }, function() {});
     };

     $scope.showAdvanced = function(ev) {
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
         $mdDialog.show({
                 controller: DialogController,
                 templateUrl: '/partials/setting.tmpl.html',
                 parent: angular.element(document.body),
                 targetEvent: ev,
                 clickOutsideToClose: true,
                 fullscreen: useFullScreen
             })
             .then(function(answer) {
                 console.log("the graph status is "+answer);
                 $scope.changeGraphStatus(answer);
             }, function() {});
         $scope.$watch(function() {
             return $mdMedia('xs') || $mdMedia('sm');
         }, function(wantsFullScreen) {
             $scope.customFullscreen = (wantsFullScreen === true);
         });
     };



 };

 function DialogController($scope, $mdDialog, GraphService) {

     console.log("the DialogController begin running");
     console.log("the lineThickness is " + GraphService.lineThickness);


     var originatorEv;
     $scope.lineThickness = GraphService.lineThickness;
     $scope.axisFontSize = GraphService.axisFontSize;
     $scope.labelFontSize = GraphService.labelFontSize;
     $scope.label = "混凝土上缘最大应力";
     console.log(GraphService.col);
     $scope.col = GraphService.col;
     $scope.color = GraphService.col[0];

     $scope.openMenu = function($mdOpenMenu, ev) {
         originatorEv = ev;
         $mdOpenMenu(ev);
     };
     $scope.hide = function() {
         $mdDialog.hide();
     };
     $scope.cancel = function() {
         $mdDialog.cancel();
     };
     $scope.answer = function(answer) {
         GraphService.lineThickness = $scope.lineThickness;
         GraphService.axisFontSize = $scope.axisFontSize;
         GraphService.labelFontSize = $scope.labelFontSize;
         GraphService.col = $scope.col;
         $mdDialog.hide($scope.col);
     };

     $scope.selectItem1 = function() {
         $scope.label = "混凝土上缘最大应力";
         $scope.color = $scope.col[0];

     };
     $scope.selectItem2 = function() {
         $scope.label = "混凝土上缘最小应力";
         $scope.color = $scope.col[1];
     };
 };
