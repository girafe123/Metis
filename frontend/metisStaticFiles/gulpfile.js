var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});

gulp.task('less', function() {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('../../backend/metis/document/static/document/dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/**', ['less']);
});