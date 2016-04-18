var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var processhtml = require('gulp-processhtml'); //主页的一些内容替换
var concat = require('gulp-concat'); //合并
var uglify = require('gulp-uglify'); //压缩
var browserSync = require('browser-sync');

var jsFiles = [
    './app/bower_components/amcharts/dist/amcharts/amcharts.js',
    './app/bower_components/amcharts/dist/amcharts/serial.js',
    './app/bower_components/amcharts/dist/amcharts/plugins/dataloader/dataloader.min.js',
    './app/bower_components/jquery/dist/jquery.min.js',
    './app/bower_components/angular/angular.js',
    './app/bower_components/angular-animate/angular-animate.min.js',
    './app/bower_components/angular-aria/angular-aria.min.js',
    './app/bower_components/angular-messages/angular-messages.min.js',
    './app/bower_components/angular-material/angular-material.js',
    './app/bower_components/angular-material-icons/angular-material-icons.min.js',
    './app/js/app.js',
    './app/js/controllers/controller.js',
    './app/js/controllers/IconController.js',
    './app/js/controllers/ItemListController.js',
    './app/js/controllers/TabController.js',
    './app/js/directives/directive.js',
    './app/js/directives/ConChartsDirective.js',
    './app/js/services/GraphService.js',
    './app/js/fileManage/FileManage.js',
];



gulp.task('default', function() {});


gulp.task('lessToCss', function() {
    gulp.src(['./app/css/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./app/css'));
});


gulp.task('live', function() {
    gulp.watch('./app/css/*.less', ["lessToCss"]);
    browserSync({
        files: "**",
        open: false,
        // 更改默认端口
        port: 7788,
        ui: {
            port: 7789
        },
        server: {
            baseDir: "./app/"
        }
    });
});


gulp.task('scriptsMin', function() {
    gulp.src(jsFiles)
        .pipe(concat('all.js')) // 合并 JavaScript ，并设置合并后的文件名
        //.pipe(uglify()) // 执行 JavaScript 压缩
        .pipe(gulp.dest('./public/js'));
});

gulp.task('processCss', function() {
    gulp.src(['./app/css/*.css', './app/bower_components/angular-material/angular-material.css'])
        .pipe(concat('all.css')) //合并
        .pipe(gulp.dest('./public/css'));
});

gulp.task('processHtml', function() {
    gulp.src('./app/index.html')
        .pipe(processhtml()) //替换
        .pipe(gulp.dest('./public'));
});

gulp.task('build',['scriptsMin','processCss','processHtml'],function(){
    console.log("Successfully build");
});