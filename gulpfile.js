'use strict';

const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass')(require('node-sass')),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    terser = require('gulp-terser'),
    rigger = require('gulp-rigger');

const path = {
    build: {
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
        img:'src/img/**/*.{jpg,gif,jpeg,png,svg,webp}'
    }
};
gulp.task('mv:fonts', function(done){
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
    done();
});

gulp.task('build:html', function (done) {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html))
    done();
});

gulp.task('build:scss', function (done){
    gulp.src(path.build.scss)
        .pipe(plumber())
        .pipe(scss({
            outputStyle:''
            }
        ))
        .pipe()
})

gulp.task('default', gulp.series('mv:fonts'));

