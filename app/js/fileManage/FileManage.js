var fs = require('fs');

//测试时候用
//var str = "C:/Documents and Settings/Administrator/桌面/test/12.out";
//var path = "C:/data/1";
//createData(str, path);
//测试时候用


//函数：createData
//参数str：输入文件的全部路径
//参数path：生成数据文件存放的目录，形如data/1
//函数用途：将str的文件生成数据放到path下
function createData(str, path) {
    console.log("begin creating Data!");
    //console.log(str);
    //var input = fs.createReadStream(str);
    var input = fs.readFileSync(str, "utf-8");
    genData(input, path);
    console.log("has createData!");

}


//函数：genData
//参数data：输入的文件数据
//参数path：生成数据文件存放的目录，形如data/1
//函数用途：createData的具体实现

function genData(data, outputpath) {

    //参数：remaining表示数据被一行一行读取后剩余的数据
    //参数：row表示当前的行号
    //参数：combNum表示组合数
    //参数：eleNum表示单元总数
    var remaining = '';
    var row = 0;
    var combNum = 0;
    var eleNum = 0;

    //保证根目录下存在/data子目录
    if (fs.existsSync('/data')) {} else {
        fs.mkdirSync('/data');
    }

    remaining += data;
    var index = remaining.indexOf('\n');

    function getLine(num) {
        for (var j = 0; j < num; j++) {
            index = remaining.indexOf('\n');
            line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            row++;
        }
    }

    //开始读取数据文件，逐行读取
    while (index > -1) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        //对每一个读入的行进行操作
        row++;
        //从第66行读到组合数以及单元总数
        if (row == 66) {
            eleNum = line.substring(41, 44);
            combNum = line.substring(73, 76);
            //console.log("combNum is " + combNum + " and eleNum is " + eleNum);
        }

        //createCombData
        //对每一行进行判断，如果当前行有“CO0=”形式的字符，就对该行之后的数据进行处理
        if (line.substring(10, 14) == 'CO0=') {
            //参数currentCombNum表示当前是第几个组合数
            var currentCombNum = line.substring(16, 17);
            //console.log("In combination"+currentCombNum);
            var combResult = '';
            combResult += '[\n';
            //读取下一行
            getLine(2);
            //开始处理数据
            for (var i = 1; i <= eleNum; i++) {
                //if(currentCombNum==1){
                //console.log(line);
                //}                 
                combResult += '{\n';
                combResult += '"num":' + line.substring(4, 7) + ',\n';
                var t1 = (Number(line.substring(11, 23)) / 6).toFixed(2);
                var t2 = (Number(line.substring(23, 35)) / 6).toFixed(2);
                var t3 = (Number(line.substring(35, 47))).toFixed(1);
                var t4 = (Number(line.substring(47, 59))).toFixed(1);
                var t5 = (Number(line.substring(59, 71))).toFixed(1);
                var t6 = (Number(line.substring(71, 79))).toFixed(1);

                combResult += '"up_max":' + t1 + ',\n';
                combResult += '"up_min":' + t2 + ',\n';
                combResult += '"dwn_max":' + t3 + ',\n';
                combResult += '"dwn_min":' + t4 + ',\n';
                combResult += '"div_max":' + t5 + ',\n';
                combResult += '"div_min":' + t6 + ',\n';
                combResult += '"up_max' + i + '":' + t1 + ',\n';
                combResult += '"up_min' + i + '":' + t2 + ',\n';
                combResult += '"dwn_max' + i + '":' + t3 + ',\n';
                combResult += '"dwn_min' + i + '":' + t4 + ',\n';
                combResult += '"div_max' + i + '":' + t5 + ',\n';
                combResult += '"div_min' + i + '":' + t6 + '\n';
                combResult += '}';
                if (i != eleNum) {
                    combResult += ',\n';
                }
                //读取下一行
                getLine(2);
            }
            combResult += ']';

            //创建数据文件目录
            //数据文件只有创建在安装目录下，因为amchart不支持读取本地文件
            //在安装目录下生成data文件夹，内部有1,2,3,4等文件夹，代表第n个按钮对应的数据文件
            if (fs.existsSync(outputpath)) {
                console.log('已经创建过此更新目录了');
            } else {
                fs.mkdirSync(outputpath);
                console.log('更新目录已创建成功\n');
            }
            console.log(outputpath + "/Comb" + currentCombNum + ".json");

            //输出流是异步的啊！！！
            //var output = fs.createWriteStream(outputpath + "/Comb" + currentCombNum + ".json");
            //output.write(combResult);
            var output = outputpath + "/Comb" + currentCombNum + ".json";
            fs.writeFileSync(output, combResult);

        } //end createCombData

        index = remaining.indexOf('\n');

    } //end while
} //end function
