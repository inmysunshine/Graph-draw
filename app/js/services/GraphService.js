var module = angular.module('drawApp.service', []);

module.service('GraphService', ['$rootScope', function($rootScope) {

    var service = {

        //这几个参数是用来控制图表的状态的
        lineThickness: 3,
        axisFontSize: 15,
        labelFontSize: 15,
        info: [
            { index: 0, name: '混凝土上缘最大应力' },
            { index: 1, name: '混凝土上缘最小应力' },
            { index: 2, name: '钢梁上缘最大应力' },
            { index: 3, name: '钢梁上缘最小应力' },
            { index: 4, name: '钢梁下缘最大应力' },
            { index: 5, name: '钢梁下缘最小应力' }
        ],
        colorSet: [
            { red: 255, green: 0, blue: 0 },
            { red: 0, green: 0, blue: 0 },
            { red: 255, green: 0, blue: 0 },
            { red: 0, green: 0, blue: 0 },
            { red: 34, green: 139, blue: 34 },
            { red: 0, green: 0, blue: 255 }
        ],
        conChartLabel: "组合应力2",

        //type表示类别：组合应力，施工阶段应力或其他
        //combNum表示第几个组合
        //tabNum表示当前选择的数据文件编号
        type: "组合应力",
        combNum: 2,
        currentNum: 1,

    }
    return service;
}]);
