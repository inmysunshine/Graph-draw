var controller = angular.module('drawApp.controller', []);

controller.run(function($rootScope) {
    //
 $rootScope.lineThickness = 3;
 $rootScope.axisFontSize=15;
 $rootScope.labelFontSize=15;
 $rootScope.col=[
    {red: 255,green: 0,blue:0},
    {red: 0,green: 0,blue:0}
    ];

 //console.log("!!!"+ $rootScope.color.red);
 //$rootScope.red=0;
})