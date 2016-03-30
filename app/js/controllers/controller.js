var controller = angular.module('drawApp.controller', []);

controller.run(function($rootScope) {
 
 //全局的变量
 $rootScope.lineThickness = 3;
 $rootScope.axisFontSize=15;
 $rootScope.labelFontSize=15;
 $rootScope.col=[
    {red: 255,green: 0,blue:0},
    {red: 0,green: 0,blue:0}
    ];

$rootScope.conChartLabel="组合应力2";
$rootScope.currentNum=1;
})