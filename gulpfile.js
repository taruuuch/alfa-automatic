const browserSync = require('browser-sync').create();
const { task, series, watch, src, dest } = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const del = require('del');

const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano')({
	preset: [
		'default', {
			discardComments: {
				removeAll: true
			}
		}
	]
});

const path = {
	build: {
		pug   : 'build/',
		js    : 'build/js/',
		style : 'build/style/',
		image : 'build/images/',
		font  : 'build/font/'
	},
	src: {
		pug  : {
			watch: 'src/templates/**/*.pug',
			prod: 'src/templates/*.pug'
		},
		js   : 'src/js/**/*.js',
		style: 'src/sass/**/*.{sass,scss}',
		image: 'src/images/**/*.{jpg,jpeg,png,gif,svg,ico}',
		font : 'src/font/**/*.{eot,ttf,woff,woff2}',
		jslib: [
			'src/lib/js/*.js'
		],
		csslib: [
			'src/lib/css/*.css'
		]
	}
};

const postcssPlugins = [
	autoprefixer(),
	cssnano,
	mqpacker()
];

task('browserSyncServer', (done) => {
	browserSync.init({
		server: {
			baseDir: path.build.pug,
		},
		notify: true
	});
	done();
});

task('reload', (done) => {
	browserSync.reload();
	done();
});

task('js:dev', () => {
	return src(path.src.js)
		.on('error', notify.onError({
			message: '\n<%= error.message %>',
			title: 'JS'
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream());
});

task('js:build', () => {
	return src(path.src.js)
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream());
});

task('sass:dev', () => {
	return src(path.src.style)
		.pipe(sass())
		.on('error', notify.onError({
			message: '\n<%= error.message %>',
			title: 'SASS'
		}))
		.pipe(sourcemaps.init())
		.pipe(postcss(postcssPlugins))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(path.build.style))
		.pipe(browserSync.stream());
});

task('sass:build', () => {
	return src(path.src.style)
		.pipe(sass())
		.pipe(postcss(postcssPlugins))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(dest(path.build.style))
		.pipe(browserSync.stream());
});

task('pug:dev', () => {
	return src(path.src.pug.prod)
		.pipe(pug({
			pretty: true
		}))
		.on('error', notify.onError({
			message: '\n<%= error.message %>',
			title: 'PUG'
		}))
		.pipe(dest(path.build.pug))
		.pipe(browserSync.stream());
});

task('pug:build', () => {
	return src(path.src.pug.prod)
		.pipe(pug({
			pretty: true
		}))
		.pipe(dest(path.build.pug))
		.pipe(browserSync.stream());
});

task('image:dev', () => {
	return src(path.src.image)
		.pipe(dest(path.build.image))
		.pipe(browserSync.stream());
});

task('image:build', () => {
	return src(path.src.image)
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest(path.build.image))
		.pipe(browserSync.stream());
});

task('font', () => {
	return src(path.src.font)
		.pipe(dest(path.build.font))
		.pipe(browserSync.stream());
});

task('jslib', () => {
	return src(path.src.jslib)
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream());
});

task('csslib', () => {
	return src(path.src.csslib)
		.pipe(dest(path.build.style))
		.pipe(browserSync.stream());
});

task('watcher', () => {
	watch(path.src.pug.watch, series('pug:dev', 'reload'));
	watch(path.src.style, series('sass:dev', 'reload'));
	watch(path.src.js, series('js:dev', 'reload'));
	watch(path.src.image, series('image:dev', 'reload'));
	watch(path.src.font, series('font', 'reload'));
	watch(path.src.jslib, series('jslib', 'reload'));
	watch(path.src.csslib, series('csslib', 'reload'));
});

task('clean', () => del(`${path.build.pug}/**`));

task('dev', series('pug:dev', 'js:dev', 'sass:dev', 'image:dev', 'csslib', 'jslib', 'font', 'browserSyncServer', 'watcher'));
task('build', series('clean', 'pug:build', 'js:build', 'sass:build', 'image:build'));
task('image', series('clean', 'image:build'));
