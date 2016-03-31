(function() {
    'use strict';
    angular
        .module('drawApp.controller2', ['ngMaterial'])
        .controller('TabController', TabCtrl);

    //这是一个全局的控制器

    function TabCtrl($scope, $log, $mdDialog, $window, $rootScope) {
        var tabs = [
            { title: '测试用例', Num: '1', state: 'md-primary' } //Num是每个按钮的编号
        ];
        $scope.tabs = tabs;
        //$scope.currentNum=1;//当前按钮的编号
        $scope.tabNum = 1; //总共按钮的编号




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



        //函数：changState
        //参数:index即为选择的按钮的编号属性
        //用途:根据选择的按钮的编号属性，更新各个按钮的显示状态
        //这个函数调用了ConChartDirective的loadData2方法以及rootScope上的currentNum全局变量
        $scope.changState = function(index) {
            $scope.loadData2(index);
            $rootScope.currentNum = index;
            //console.log($scope.tabs);
            //console.log("after loadding data,the index is " + index);
            for (var t = 0; t < $scope.tabs.length; t++) {
                //console.log("changState t is" + $scope.tabs[t]);
                if ($scope.tabs[t].Num == index) {
                    $scope.tabs[t].state = 'md-primary';
                } else {
                    $scope.tabs[t].state = 'md-default';
                };
            };
        };

        //函数：addTab() 
        //用途: 输入文件名以及文件路径，增加tabNum(当前按钮的总个数)，更新按钮显示情况情况
        //参数：name即输入文件的文件名
        //参数: path数据文件的路径
        $scope.addTab = function(name, path) {
            //将文件拖动进来的时候，先更新按钮列表，弹出提示
            $scope.tabNum++;
            tabs.push({ title: name, Num: $scope.tabNum, state: 'md-primary' });
            $scope.changState($scope.tabNum);
            $scope.showAlert();
            //根据当前激活的页面的数量，决定将数据生成到第几个文件夹里
            var outPath = 'data/' + $scope.tabNum;
            createData(path, outPath);
            //$scope.changState($scope.tabNum);

        };

        //函数：fileChange() 
        //用途: 根据输入文件的名称与路径，更新按钮以及生产数据
        $scope.fileChange = function fileChange(val) {
            console.log(val);
            console.log(val[0].name);
            console.log(val[0].path);
            $scope.addTab(val[0].name, val[0].path);
            //console.log("The file has changed");
        };

        //拖放操作
        $window.ondragover = function(e) {
            e.preventDefault();
            return false;
        };
        $window.ondrop = function(e) {
            e.preventDefault();
            console.log(e.dataTransfer.files[0]);
            //console.log(e.dataTransfer.files[0].path);
            //将文件拖动进来的时候，调用addTab函数
            $scope.addTab(e.dataTransfer.files[0].name, e.dataTransfer.files[0].path);
            return false;
        };
        $window.onload=function(){
            delData();
        }

    }
})();
