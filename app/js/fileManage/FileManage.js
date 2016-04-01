var fs = require('fs');

//测试时候用
//var str = "C:/Documents and Settings/Administrator/桌面/test/";
//var path = "data/1";
//createData(str, path);

//函数：createData
//参数str：输入文件的全部路径
//参数path：生成数据文件存放的目录，形如data/1
//函数用途：将str的文件生成数据放到path下
function createData(str, path) {
    console.log("begin creating Data!");
    //console.log(str);
    //var input = fs.createReadStream(str);
    var input = fs.readFileSync(str, "utf-8");
    readLines(input, path);
    console.log("has createData!");

}

function delData() {
    // 删除data文件夹 
    /*
    var exec = require('child_process').exec;
    exec('rm -rf data/',
        function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }

        });
    */
}

//函数：readLines
//参数data：输入的文件数据
//参数path：生成数据文件存放的目录，形如data/1
//函数用途：createData的具体实现

function readLines(data, outputpath) {

    //参数：remaining表示数据被一行一行读取后剩余的数据
    //参数：row表示当前的行号
    //参数：combNum表示组合数
    //参数：eleNum表示单元总数
    var remaining = '';
    var row = 0;
    var combNum = 0;
    var eleNum = 0;

    //input.on('data', function(data) {
    //如果用文件流的话，文件是持续读出来的，并不是一口气全部读出来的
    //会出现输出文件到一定量时输出的全是空白符号的错误，由于异步操作引起
    //解决方案目前还没有思路
    //var output2 = fs.createWriteStream("data.txt");
    //output2.write(data);

    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
        //console.log(index);
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        //对每一个读入的行进行操作
        row++;
        //从第66行读到组合数以及单元总数
        //console.log(row);
        if (row == 66) {
            //console.log(line);
            eleNum = line.substring(41, 44);
            combNum = line.substring(73, 76);
            //console.log("combNum is " + combNum + " and eleNum is " + eleNum);
        }
        //对每一行进行判断，如果当前行有“CO0=”形式的字符，就对该行之后的数据进行处理
        if (line.substring(10, 14) == 'CO0=') {
            //参数currentCombNum表示当前是第几个组合数
            currentCombNum = line.substring(16, 17);
            //console.log("In combination"+currentCombNum);
            var result = '';
            result += '[\n';
            //读取下一行
            index = remaining.indexOf('\n');
            line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            index = remaining.indexOf('\n');
            line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            row += 2;
            //开始处理数据
            for (var i = 1; i <= eleNum; i++) {
                //if(currentCombNum==1){
                //console.log(line);
                //}                 
                result += '{\n';
                result += '"num":' + line.substring(4, 7) + ',\n';
                var t1 = (Number(line.substring(11, 23)) / 6).toFixed(2);
                var t2 = (Number(line.substring(23, 35)) / 6).toFixed(2);
                var t3 = (Number(line.substring(35, 47))).toFixed(1);
                var t4 = (Number(line.substring(47, 59))).toFixed(1);
                var t5 = (Number(line.substring(59, 71))).toFixed(1);
                var t6 = (Number(line.substring(71, 79))).toFixed(1);

                result += '"up_max":' + t1 + ',\n';
                result += '"up_min":' + t2 + ',\n';
                result += '"dwn_max":' + t3 + ',\n';
                result += '"dwn_min":' + t4 + ',\n';
                result += '"div_max":' + t5 + ',\n';
                result += '"div_min":' + t6 + ',\n';
                result += '"up_max' + i + '":' + t1 + ',\n';
                result += '"up_min' + i + '":' + t2 + ',\n';
                result += '"dwn_max' + i + '":' + t3 + ',\n';
                result += '"dwn_min' + i + '":' + t4 + ',\n';
                result += '"div_max' + i + '":' + t5 + ',\n';
                result += '"div_min' + i + '":' + t6 + '\n';
                result += '}';
                if (i != eleNum) {
                    result += ',\n';
                }
                //读取下一行
                index = remaining.indexOf('\n');
                line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                index = remaining.indexOf('\n');
                line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                row += 2;
            }
            result += ']';

            //创建数据文件目录
            //数据文件只有创建在安装目录下，因为amchart不支持读取本地文件
            //在安装目录下生成data文件夹，内部有1,2,3,4等文件夹，代表第n个按钮对应的数据文件
            if (fs.existsSync(outputpath)) {
                //console.log('已经创建过此更新目录了');
            } else {
                fs.mkdirSync(outputpath);
                //console.log('更新目录已创建成功\n');
            }
            console.log(outputpath + "/Comb" + currentCombNum + ".json");

            //输出流是异步的啊！！！
            //var output = fs.createWriteStream(outputpath + "/Comb" + currentCombNum + ".json");
            //output.write(result);
            var output = outputpath + "/Comb" + currentCombNum + ".json";
            fs.writeFileSync(output, result);
        }
        index = remaining.indexOf('\n');
    }

    //});

    /*
    input.on('end', function() {
        if (remaining.length > 0) {
            //console.log(remaining);
        }
    });
    */
}
