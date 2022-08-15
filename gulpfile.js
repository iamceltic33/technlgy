const gulp = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();
const concat = require('gulp-concat');
const terser = require('gulp-terser');

const deleteBuild = () => {
    return del('build');
}

const reload = (done) => {
    sync.reload();
    done();
}
exports.reload = reload;

const server = done => {
    sync.init({
        server: {
            baseDir: 'build'
        },
        cors: true,
        notify: false,
        ui: false
    });
    done();
}

const pugTask = () => {
    return gulp.src('source/pug/*.pug', {allowEmpty: true})
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('source'))
}
exports.pugTask = pugTask;

const cssTask = () => {
    return gulp.src('source/sass/style.scss')
        .pipe(sass())
        .pipe(sourcemap.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('build/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css'))        
}
exports.cssTask = cssTask;

const minifyScripts = () => {
	return gulp
		.src(['source/js/**/*.js', '!source/js/libs/**.*js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(terser())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('build/js'));
};
exports.minifyScripts = minifyScripts;

const copyAssets = () => {
    return gulp.src(
        [
            'source/fonts/**/*.{woff,woff2,ttf}',
            'source/images/**',
            'source/js/libs/**/*.js',
            'source/favicon/**',
            'source/*.html'
        ],
        {
            base: 'source'
        }
    )
    .pipe(gulp.dest('build'))
}
exports.copyAssets = copyAssets;

const watcher = () => {
    gulp.watch('source/sass/**/*.scss', gulp.series(cssTask));
    gulp.watch('source/pug/**/*.pug', gulp.series(pugTask));
    gulp.watch(['source/fonts/**/*.{woff,woff2,ttf}',
    'source/images/**',
    'source/js/libs/**/*.js',
    'source/favicon/**',
    'source/*.html'], gulp.series(copyAssets));
    gulp.watch(['source/js/**/*.js', '!source/js/libs/**.*js'], minifyScripts);
    gulp.watch(['source/fonts/**/*.{woff,woff2,ttf}',
    'source/images/**',
    'source/js/**/*.js',
    'source/favicon/**',
    'source/*.html']).on('change', sync.reload)
}
exports.watcher = watcher;
const build = gulp.series(deleteBuild, pugTask, cssTask, minifyScripts, copyAssets)

exports.default = gulp.series(build, server, watcher)