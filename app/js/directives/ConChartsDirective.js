angular.module('drawApp.directive', [])
    .directive('concretechart',
        function() {
            return {
                restrict: 'E',
                replace: true,

                template: '<div id="chartdiv" style="min-width: 310px; height: 400px; margin: 0 auto"></div>',
                link: function(scope, element, attrs) {

                        var chart;
                        var graph;
                        var graph1;
                        var graph2;
                        var categoryAxis;
                        var valueAxis;
                        var legend;

                        AmCharts.ready(function() {
                            // SERIAL CHART
                            chart = new AmCharts.AmSerialChart();

                            chart.dataLoader = {
                                "url": "data/Comb2.json",
                                "format": "json"
                            };

                            //chart.dataProvider = chartData;
                            chart.marginLeft = 10;
                            chart.categoryField = "num";

                            // AXES
                            // category
                            categoryAxis = chart.categoryAxis;
                            categoryAxis.fontSize = 15;
                            categoryAxis.axisAlpha = 0.07;
                            categoryAxis.dashLength = 3;
                            categoryAxis.minorGridEnabled = true;
                            categoryAxis.minorGridAlpha = 0.1;

                            // value
                            valueAxis = new AmCharts.ValueAxis();
                            valueAxis.fontSize = 15;
                            valueAxis.axisAlpha = 0.07;
                            valueAxis.inside = true;
                            valueAxis.dashLength = 3;
                            valueAxis.title = "MPa";
                            chart.addValueAxis(valueAxis);

                            // GRAPH
                            graph = new AmCharts.AmSerialChart();
                            graph.valueField = "up_max";
                            graph.type = "line";
                            graph.title = "混凝土上缘最大应力";
                            graph.lineThickness = 3;
                            graph.labelText = "";
                            graph.lineColor = "#000000";
                            graph.fontSize = 15;
                            chart.addGraph(graph);

                            graph1 = new AmCharts.AmSerialChart();
                            graph1.valueField = "up_min";
                            graph1.type = "line";
                            graph1.title = "混凝土上缘最小应力";
                            graph1.lineThickness = 3;
                            graph1.labelText = "";
                            graph1.lineColor = "#FF0000";
                            graph1.fontSize = 15;
                            chart.addGraph(graph1);

                            // CURSOR
                            var chartCursor = new AmCharts.ChartCursor();
                            chartCursor.cursorAlpha = 0;
                            chartCursor.cursorPosition = "mouse";
                            chart.addChartCursor(chartCursor);

                            // SCROLLBAR
                            var chartScrollbar = new AmCharts.ChartScrollbar();
                            chart.addChartScrollbar(chartScrollbar);
                            chart.creditsPosition = "bottom-right";

                            // LEGEND
                            legend = new AmCharts.AmLegend();
                            legend.bulletType = "round";
                            legend.equalWidths = false;
                            legend.fontSize = 15;
                            legend.valueText = "[[value]]MPa";
                            legend.valueWidth = 120;
                            chart.addLegend(legend);

                            // WRITE
                            chart.write("chartdiv");
                        });

                        scope.loadData = function loadData(str) {
                            console.log(str[0] + str[1]);
                            if (str[0] == "组合应力") {
                                urlStr = "data/Comb" + str[1] + ".json";
                                //console.log(chart.dataLoader.url);
                            };
                            chart.dataLoader.url = urlStr;
                            console.log(chart);
                            chart.dataLoader.loadData();
                            chart.validateData();
                            //chart.validateNow();
                        };

                        scope.loadMaxMin = function loadMaxMin() {

                            if (graph.labelText == "" || graph1.labelText == "") {
                                graph.labelText = "[[mark1]]";
                                graph1.labelText = "[[mark2]]";
                            } else {
                                graph.labelText = "";
                                graph1.labelText = "";
                            }
                            chart.validateNow();
                        };

                        scope.mark = function mark(str) {

                            graph.labelText = "";
                            graph1.labelText = "";

                            //分割字符串
                            var strs = new Array(); //定义一数组
                            strs = str.split(" "); //字符分割
                            for (i = 0; i < strs.length; i++) {
                                if (strs[i] == "")
                                    break;
                                //alert(strs[i]);
                                graph.labelText += "[[up_smax" + strs[i] + "]]";
                                graph1.labelText += "[[up_min" + strs[i] + "]]";

                            }
                            chart.validateNow();
                        };

                        scope.changeStatus = function changeStatus(str) {

                            //第一个表示线条粗细
                            graph.lineThickness = scope.lineThickness;
                            graph1.lineThickness = scope.lineThickness;
                            //第二个表示坐标轴字体
                            categoryAxis.fontSize = scope.axisFontSize;
                            valueAxis.fontSize = scope.axisFontSize;
                            //legend.fontSize=strs[1];
                            //第三个表示标注字体
                            graph.fontSize = scope.labelFontSize;
                            graph1.fontSize = scope.labelFontSize;

                            //分割字符串
                            //var strs = new Array(); //定义一数组
                            //strs = str.split("#"); //字符分割
                            var decimal = Number(str[0].red) * 65536 + Number(str[0].green) * 256 + Number(str[0].blue);
                            var s = decimal.toString(16);
                            while (s.length < 6)
                                s = "0" + s;

                            var decimal1 = Number(str[1].red) * 65536 + Number(str[1].green) * 256 + Number(str[1].blue);
                            var s1 = decimal1.toString(16);
                            while (s1.length < 6)
                                s1 = "0" + s1;


                            graph.lineColor = "#" + s;
                            graph1.lineColor = "#" + s1;
                            chart.validateNow();
                        }

                    } //end link           
            } //end return
        });
