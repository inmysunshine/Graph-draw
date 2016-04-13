angular.module('drawApp.directive', [])
    .directive('concretechart', ['GraphService',
        function(GraphService) {
            return {
                restrict: 'E',
                replace: true,

                template: '<div><div id="chartdiv0" style="min-width: 310px; height: 400px; margin: 0 auto"></div>' + '<div id="chartdiv1" style="min-width: 310px; height: 400px; margin: 0 auto"></div></div>',

                link: function(scope, element, attrs) {

                        var chart1, chart2;
                        var categoryAxis1, categoryAxis2;
                        var valueAxis1, valueAxis2;
                        var legend1, legend2;

                        var chart = [chart1, chart2];
                        var categoryAxis = [categoryAxis1, categoryAxis2];
                        var valueAxis = [valueAxis1, valueAxis2];
                        var legend = [legend1, legend2];

                        var graph1, graph2, graph3, graph4, graph5;
                        var graph = [graph1, graph2, graph3, graph4, graph5];
                        var graphItem = [
                            { "startNum": 0, "endNum": 2 },
                            { "startNum": 2, "endNum": 6 },
                        ];
                        var graphInfo = [
                            { "valueField": "up_max", "title": "混凝土上缘最大应力", "lineColor": "#FF0000" },
                            { "valueField": "up_min", "title": "混凝土上缘最小应力", "lineColor": "#000000" },
                            { "valueField": "div_max", "title": "钢梁上缘最大应力", "lineColor": "#FF0000" },
                            { "valueField": "div_min", "title": "钢梁上缘最小应力", "lineColor": "#000000" },
                            { "valueField": "dwn_max", "title": "钢梁下缘最大应力", "lineColor": "#228B22" },
                            { "valueField": "dwn_min", "title": "钢梁下缘最小应力", "lineColor": "#0000FF" },
                        ];

                        AmCharts.ready(function() {

                            for (var i = 0; i < 2; i++) {
                                // SERIAL CHART
                                chart[i] = new AmCharts.AmSerialChart();
                                console.log(chart[i]);

                                chart[i].dataLoader = {
                                    "url": "/data/1/Comb2.json",
                                    "format": "json"
                                };

                                //chart[i].dataProvider = chartData;
                                chart[i].marginLeft = 10;
                                chart[i].categoryField = "num";

                                // AXES
                                // category
                                categoryAxis[i] = chart[i].categoryAxis;
                                categoryAxis[i].fontSize = 15;
                                categoryAxis[i].axisAlpha = 0.07;
                                categoryAxis[i].dashLength = 3;
                                categoryAxis[i].minorGridEnabled = true;
                                categoryAxis[i].minorGridAlpha = 0.1;

                                // value
                                valueAxis[i] = new AmCharts.ValueAxis();
                                valueAxis[i].fontSize = 15;
                                valueAxis[i].axisAlpha = 0.07;
                                valueAxis[i].inside = true;
                                valueAxis[i].dashLength = 3;
                                valueAxis[i].title = "MPa";
                                chart[i].addValueAxis(valueAxis[i]);

                                // GRAPH
                                for (var j = graphItem[i].startNum; j < graphItem[i].endNum; j++) {
                                    graph[j] = new AmCharts.AmSerialChart();
                                    graph[j].valueField = graphInfo[j].valueField;
                                    graph[j].type = "line";
                                    graph[j].title = graphInfo[j].title;
                                    graph[j].lineThickness = 3;
                                    graph[j].labelText = "";
                                    graph[j].lineColor = graphInfo[j].lineColor;
                                    graph[j].fontSize = 15;
                                    chart[i].addGraph(graph[j]);
                                }

                                // CURSOR
                                var chartCursor = new AmCharts.ChartCursor();
                                chartCursor.cursorAlpha = 0;
                                chartCursor.cursorPosition = "mouse";
                                chart[i].addChartCursor(chartCursor);

                                // SCROLLBAR
                                var chartScrollbar = new AmCharts.ChartScrollbar();
                                chart[i].addChartScrollbar(chartScrollbar);
                                chart[i].creditsPosition = "bottom-right";

                                // LEGEND
                                legend[i] = new AmCharts.AmLegend();
                                legend[i].bulletType = "round";
                                legend[i].equalWidths = false;
                                legend[i].fontSize = 15;
                                legend[i].valueText = "[[value]]MPa";
                                legend[i].valueWidth = 120;
                                chart[i].addLegend(legend[i]);

                                // WRITE
                                chart[i].write("chartdiv" + i);

                            }
                        });

                        //这些函数用来修改chart中的数据
                        //函数：loadData()
                        //用途：根据左侧菜单变化载入数据
                        //参数：
                        //type表示类别：组合应力，施工阶段应力或其他
                        //combNum表示第几个组合
                        scope.loadData = function loadData(type, combNum) {
                            GraphService.type = type;
                            GraphService.combNum = combNum;
                            scope.conChartLabel = "组合应力" + GraphService.combNum;
                            //console.log(str[0] + str[1]);
                            var urlStr;
                            if (GraphService.type == "组合应力") {
                                urlStr = "data/" + GraphService.currentNum + "/Comb" + GraphService.combNum + ".json";
                                //console.log(chart.dataLoader.url);
                            };

                            for (var i = 0; i < 2; i++) {
                                chart[i].dataLoader.url = urlStr;
                                chart[i].dataLoader.loadData();
                                chart[i].validateData();
                                chart[i].validateNow();
                            }
                        };

                        var flag1 = true;
                        var flag2 = true;
                        var flag = [flag1, flag2];
                        var guideMax = new AmCharts.Guide();
                        var guideMin = new AmCharts.Guide();

                        scope.loadMaxMin = function loadMaxMin() {

                            for (var i = 0; i < 2; i++) {

                                // get chart and value axis
                                //var chart = event.chart;
                                var axis = chart[i].valueAxes[0];

                                // create max guide
                                guideMax.value = guideMax.label = axis.maxReal;
                                guideMax.lineAlpha = 0.5;
                                guideMax.lineThickness = 3;
                                guideMax.lineColor = guideMax.color = "#FF0000";


                                // create min guide
                                guideMin.value = guideMin.label = axis.minReal;
                                guideMin.lineAlpha = 0.5;
                                guideMin.lineThickness = 3;
                                guideMin.lineColor = guideMin.color = "#000000";


                                if (flag[i]) {
                                    axis.addGuide(guideMax);
                                    axis.addGuide(guideMin);
                                    console.log("true");
                                    flag[i] = false;
                                } else {
                                    axis.removeGuide(guideMax);
                                    axis.removeGuide(guideMin);
                                    console.log("false");
                                    flag[i] = true;
                                }

                                chart[i].validateNow();
                            }

                        };


                        scope.mark = function mark(str) {

                            console.log(str);
                            if (typeof(str)=="undefined") {
                                for (var i = 0; i < 6; i++) {
                                    graph[i].labelText = "";
                                }
                                console.log("the str is empty");
                                chart[0].validateNow();
                                chart[1].validateNow();
                                return;
                            }

                            //分割字符串
                            var strs = new Array(); //定义一数组
                            strs = str.split(" "); //字符分割

                            for (var i = 0; i < 6; i++) {

                                graph[i].labelText = "";

                                for (j = 0; j < strs.length; j++) {
                                    if (strs[j] == "")
                                        break;
                                    graph[i].labelText += "[[" + graphInfo[i].valueField + strs[j] + "]]";
                                }
                            }
                            chart[0].validateNow();
                            chart[1].validateNow();

                        };

                        //函数：changeGraphStatus()
                        //用途：根据字符串所给定的性质，重新绘制图表
                        scope.changeGraphStatus = function changeGraphStatus(str) {

                            for (var i = 0; i < 2; i++) {
                                categoryAxis[i].fontSize = GraphService.axisFontSize;
                                valueAxis[i].fontSize = GraphService.axisFontSize;
                            }


                            for (var i = 0; i < 6; i++) {
                                graph[i].lineThickness = GraphService.lineThickness;
                                graph[i].fontSize = GraphService.labelFontSize;

                                var decimal = Number(str[i].red) * 65536 + Number(str[i].green) * 256 + Number(str[i].blue);
                                var s = decimal.toString(16);
                                while (s.length < 6)
                                    s = "0" + s;
                                graph[i].lineColor = "#" + s;
                            }

                            chart[0].validateNow();
                            chart[1].validateNow();

                        }

                    } //end link           
            } //end return
        }
    ]);
