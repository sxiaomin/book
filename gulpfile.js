// 引入插件
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sequence = require('gulp-sequence');
// 引入内置模块
var url = require('url');
var path = require('path');
var fs = require('fs');

// 开发---编译sass 添加前缀
gulp.task('devSass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            borwsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(gulp.dest('src/css'))
})

// 开发---监听sass
gulp.task('devWatch', function() {
    return gulp.watch('src/scss/*.scss', ['devSass'])
})

//起服务
gulp.task('server', ['devSass'], function() {
    return gulp.src('src')
        .pipe(server({
            port: 8181,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
})

// 开发环境
gulp.task('dev', function(callback) {
    sequence('devSass', 'devWatch', 'server', callback)
})