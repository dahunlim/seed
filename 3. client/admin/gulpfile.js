/**
 * 해당 gulp 파일은 자동 빌드를 위한 것으로 개발 환경에서는 사용하지 않습니다.
 * Jenkins를 통해 자동 빌드되며, 모든 파일을 하나로 합쳐 난독화 하여 서버에 자동으로 업로드 합니다.
 *
 * by AramIn ( 2016-10-14 )
 */

var gulp = require('gulp')
    , path = require('path')
    , uglify = require('gulp-uglify')
    , cssmin = require('gulp-cssmin')
    , rename = require('gulp-rename')
    , sass = require('gulp-sass')
    , concat = require('gulp-concat')
    , webserver = require('gulp-webserver')
    , livereload = require('gulp-livereload')
    , minifyhtml = require('gulp-minify-html')
    , copy = require('gulp-copy');

var source = '';
var dist = 'dist';

var externalModules = [
    "lib/*.js",
    "lib/**/*.js",
    "node_modules/angular/angular.js",
    "node_modules/angular-animate/angular-animate.js",
    "node_modules/angular-aria/angular-aria.js",
    "node_modules/angular-messages/angular-messages.js",
    "node_modules/angular-sanitize/angular-sanitize.js",
    "node_modules/angular-ui-router/release/angular-ui-router.js",
    "node_modules/jquery/dist/jquery.js",
    "node_modules/bootstrap/dist/js/bootstrap.js"
];

var externalCss = [
    'scss/base/*.scss',
    'scss/component/*.scss',
    'scss/stylesheet/*.scss',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
]

/**
 * Run Web Server
 */
gulp.task('server', function () {
    return gulp.src('')
        .pipe(webserver({}));
});

gulp.task('watcher', function(){
    livereload.listen();
    gulp.watch(['app/page/**/*.html', 'scss/*.css', 'app/**/*.js', 'app/**/**/*.js'], livereload.changed);
    gulp.watch(['scss/**/*.scss', '!scss/style.scss'], function(){
        gulp.src(externalCss)
            .pipe(concat('style.scss'))
            .pipe(gulp.dest('scss'))
            .pipe(sass())
            .pipe(gulp.dest('scss'));
    })
});


/**
 * Javascript Build
 */
gulp.task('combine-javascript', function() {
    gulp.src(['app/*.js', 'app/**/*.js', '!app/**/*.develop.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));

    gulp.src(externalModules)
        .pipe(concat('library.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

/**
 * Css Build
 */
gulp.task('compile-sass', function(){
    gulp.src(externalCss)
        .pipe(concat('style.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist + '/css'));
});

/**
 * Html Compress
 */
gulp.task('compress-html', function(){
    gulp.src(['app/**/*.html'])
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/app'));
});

/**
 * Images
 */
gulp.task('copy-data', function(){
    gulp.src(['images/*.*', 'images/**/*.*'])
        .pipe(gulp.dest(dist + '/images'));
    gulp.src(['font/*.*'])
        .pipe(gulp.dest(dist + '/images'));
});

gulp.task('development', ['server', 'watcher']);
gulp.task('release', ['compress-html', 'combine-javascript', 'compile-sass', 'copy-data']);

