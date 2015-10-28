// include the required packages.
var gulp = require('gulp');

var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');

var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');

var autoprefixer = require('autoprefixer-stylus');
var argv = require('yargs').argv;

var name = argv.name;
if (!name) {
    console.error('!!!name is empty!!!');
}

console.log('project: ', name);

gulp.task('common-styl', function () {
    gulp.src('./common/*.styl')
        .pipe(gulp.dest('./' + name + '/src/css'));
});

// Get one .styl file and render
gulp.task('styl', function () {
    gulp.src('./' + name + '/src/css/index.styl')
        .pipe(stylus({
            use: [autoprefixer('iOS >= 7', 'last 2 Chrome version', 'IE >= 9')],
            compress: true
        }))
        .pipe(csso())
        .pipe(gulp.dest('./' + name + '/dist'));
});

gulp.task('minify-html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./' + name + '/src/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./' + name + '/dist'));
});

gulp.task('html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./' + name + '/src/index.html')
        .pipe(gulp.dest('./' + name + '/dist'));
});

gulp.task('js', function () {
    gulp.src('./' + name + '/src/js/index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./' + name + '/dist'))
});

gulp.task('svgo', function () {
    return gulp.src('./' + name + '/src/css/image/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./' + name + '/dist/image'));
});

gulp.task('watch', function () {
    var regex = /(blog-article|about|about-2|main|blog-main|roddoma|services|specialist|specialists-about)\/src/
    gulp.watch('./**/src/css/*.styl', function (event) {
        var folder = regex.exec(event.path);
        name = folder[1];
        console.log('stylus file rebuild for:', name);

        gulp.run('styl');
    });
    gulp.watch('./**/src/js/*.js', function (event) {
        var folder = regex.exec(event.path);
        name = folder[1];
        gulp.run('js');
    })

    //gulp.watch('./common/*.styl', function (event) {
    //    gulp.run('common-styl');
    //})

    gulp.watch('./**/src/index.html', function (event) {
        var folder = regex.exec(event.path);
        name = folder[1];
        gulp.run('html');
    });
});

gulp.task('build', function () {
    gulp.run('styl');
    gulp.run('js');
    //gulp.run('svgo');
    gulp.run('html');
    gulp.src('./' + name + '/src/css/image/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./' + name + '/dist/image'))

});

gulp.task('build-prod', function () {
    gulp.run('styl');
    gulp.run('js');
    //gulp.run('svgo');
    gulp.run('minify-html');
    gulp.src('./' + name + '/src/css/image/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./' + name + '/dist/image'))

});

// Default gulp task to run 
gulp.task('default', ['styl']);
