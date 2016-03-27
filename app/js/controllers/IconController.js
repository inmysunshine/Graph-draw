//This controller defined action of icons

angular.module('drawApp.controller')
    .controller('IconCtrl',
        function($scope, $mdDialog, $mdMedia, $rootScope) {
            $scope.settingStatus = "";
            $scope.status = "";
            $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            $scope.showAlert = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            };
            $scope.showConfirm = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('输入要标记的节点号')
                    .textContent('All of the banks have agreed to forgive you your debts.')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('Please do it!')
                    .cancel('Sounds like a scam');
                $mdDialog.show(confirm).then(function() {
                    $scope.status = 'You decided to get rid of your debt.';
                }, function() {
                    $scope.status = 'You decided to keep your debt.';
                });
            };
            $scope.showPrompt = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
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
                        $scope.changeStatus(answer);
                    }, function() {});
                $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
            };
        }
    );

function DialogController($scope, $rootScope, $mdDialog) {

    $scope.lineThickness = $rootScope.lineThickness;
    $scope.axisFontSize = $rootScope.axisFontSize;
    $scope.labelFontSize = $rootScope.labelFontSize;
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
        $mdDialog.hide(answer);
    };
}