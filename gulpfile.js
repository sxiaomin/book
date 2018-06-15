// 引入插件
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// 引入内置模块
var url = require('url');
var path = require('path');
var fs = require('fs');

//起服务
gulp.task('server', function() {
    gulp.src('src')
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