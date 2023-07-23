const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/**/*',
        dest: 'dist/img/'
    },
    dist: 'dist/'
};

gulp.task('clean', function () {
    return gulp.src(paths.dist, { allowEmpty: true, read: false })
        .pipe(clean());
});

gulp.task("styles", function () {
    return gulp.src(paths.styles.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .on("end", browserSync.reload);
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('copy', function () {
    return gulp.src('src/*.html').pipe(gulp.dest(paths.dist));
});

gulp.task('build', gulp.series('clean', 'styles', 'scripts', 'images', 'copy', function(done) {
    done();
}));

gulp.task('dev', gulp.series('build', function () {
    browserSync.init({
        server: "./",
        injectChanges: true
    });

    gulp.watch(paths.styles.src, gulp.series('styles'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch("./*.html").on("change", browserSync.reload);
}));