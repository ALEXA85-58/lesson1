'use strict';

const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass')(require('node-sass')),
    prefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    terser = require('gulp-terser'),
    rigger = require('gulp-rigger');

const path = {
    build:{
        html:'build/',
        scss:'build/css/',
        js:'build/js/',
        fonts:'build/fonts/',
        img:'build/img/',
    },
    src:{
        html:'src/*.{html,htm}',
        scss:'src/scss/main.scss',
        js:['src/js/libs.js','src/js/app.js'],
        fonts:'src/fonts/**/*.{eot,svg,ttf,woff,woff2}',
        img:'src/img/**/*.{jpg,gif,jpeg,png,svg,webp}',
    }
};

gulp.task('mv:fonts', function (done){
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
    done();
});

gulp.task('build:html', function (done) {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true,
        removeComments:true,
        useShortDoctype:true}))
        .pipe(gulp.dest(path.build.html))
    done();
});

gulp.task('build:scss', function (done){
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(prefixer({
            cascade: false,
            remove: true
        }))
        .pipe(gulp.dest(path.build.scss))
    done();
});

gulp.task('build:js', function (done) {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(terser())
        .pipe(gulp.dest(path.build.js))
    done();
});

gulp.task('default', gulp.parallel('mv:fonts','build:js','build:html','build:scss'));

