module.service('GraphService', ['$rootScope', function($rootScope) {

    var service = {

        //这几个参数是用来控制图表的状态的
        lineThickness: 3,
        axisFontSize: 15,
        labelFontSize: 15,
        col: [
            { red: 255, green: 0, blue: 0 },
            { red: 0, green: 0, blue: 0 }
        ],
        conChartLabel: "组合应力2",

        //currentNum表示当前选择的数据文件编号
        currentNum: 1,

        addBook: function(book) {
            service.books.push(book);
            $rootScope.$broadcast('books.update');
        }
    }
    return service;
}]);
