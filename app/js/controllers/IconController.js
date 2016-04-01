 //This controller defined action of icons
 (function() {
     'use strict';
     angular.module('drawApp.controller3', [])
         .controller('IconCtrl', IconCtrl)
         .controller('DialogController', DialogController);

     function IconCtrl($scope, $mdDialog, $mdMedia, $rootScope, $http) {
         $scope.settingStatus = "";
         $scope.status = "";
         $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

         $scope.showPrompt = function(ev) {
             // Appending dialog to document.body to cover sidenav in docs app
             console.log($rootScope.col);
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
                     console.log(answer);
                     $scope.changeGraphStatus(answer);
                 }, function() {});
             $scope.$watch(function() {
                 return $mdMedia('xs') || $mdMedia('sm');
             }, function(wantsFullScreen) {
                 $scope.customFullscreen = (wantsFullScreen === true);
             });
         };


         scope.loadMaxMin = function loadMaxMin() {
             $http.get('partials/graphItem.json').success(function(data) {
                 $scope.items = data;
             });
             
         };



     };

     function DialogController($scope, $rootScope, $mdDialog) {

         console.log("the DialogController begin running");

         var originatorEv;
         $scope.lineThickness = $rootScope.lineThickness;
         $scope.axisFontSize = $rootScope.axisFontSize;
         $scope.labelFontSize = $rootScope.labelFontSize;
         $scope.label = "混凝土上缘最大应力";
         console.log($rootScope.col);
         $scope.col = $rootScope.col;
         $scope.color = $scope.col[0];

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
             $rootScope.lineThickness = $scope.lineThickness;
             $rootScope.axisFontSize = $scope.axisFontSize;
             $rootScope.labelFontSize = $scope.labelFontSize;
             $rootScope.col = $scope.col;
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

 })();
