var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');


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

