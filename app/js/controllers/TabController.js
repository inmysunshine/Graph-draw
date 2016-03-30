(function() {
    'use strict';
    angular
        .module('drawApp.controller2', ['ngMaterial'])
        .controller('TabController', TabCtrl);

        //这是一个全局的控制器

    function TabCtrl($scope, $log, $mdDialog, $window,$rootScope) {
        var tabs = [
            { title: '测试用例', Num: '1', state: 'md-primary' } //Num是每个按钮的编号
        ];
        $scope.tabs = tabs;
        //$scope.currentNum=1;//当前按钮的编号
        $scope.tabNum = 1; //总共按钮的编号
        $scope.path = 'data/' + $scope.tabNum;
        console.log($scope.path);


        $scope.addTab = function(title, num) {
            //console.log(tabs);
            tabs.push({ title: title, Num: num, state: 'md-primary' });
            //console.log(tabs);
        };
        $scope.removeTab = function(tab) {
            var index = tabs.indexOf(tab);
            tabs.splice(index, 1);
        };

        $scope.showAlert = function(ev) {
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

        $scope.changState = function(index) {
        	//这里会变成异步操作，导致出错？？？？
        	//这里有一个大BUG！！！
        	$scope.loadData2(index);
        	$rootScope.currentNum=index;
            //console.log($scope.tabs);
            console.log("after loadding data,the index is " + index);
            for (var t = 0; t < $scope.tabs.length; t++) {
                //console.log("changState t is" + $scope.tabs[t]);
                if ($scope.tabs[t].Num == index) {
                    $scope.tabs[t].state = 'md-primary';
                } else {
                    $scope.tabs[t].state = 'md-default';
                };
            };
        };

        //拖放操作
        $window.ondragover = function(e) {
            e.preventDefault();
            return false;
        };
        $window.ondrop = function(e) {
            e.preventDefault();
            //console.log(e.dataTransfer.files[0]);
            //将文件拖动进来的时候，先更新按钮列表，弹出提示
            $scope.tabNum++;
            $scope.addTab(e.dataTransfer.files[0].name, $scope.tabNum);
            $scope.changState($scope.tabNum);
            $scope.showAlert();
            //根据当前激活的页面的数量，决定将数据生成到第几个文件夹里
            $scope.path = 'data/' + $scope.tabNum;
            //console.log(pathNoName);
            createData(e.dataTransfer.files[0].path, $scope.path);

            //console.log(e.dataTransfer.files[0].path);
            return false;
        };




    }
})();
