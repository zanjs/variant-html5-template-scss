/**
 * Bear
 * By Julian
 * @ zanjser@163.com
 * 2017年3月8日17:07:03
 */
import pkg          from './package.json';
import gulp         from 'gulp'
import sass         from 'gulp-sass'
import concat       from 'gulp-concat'
import minifycss    from 'gulp-minify-css'
import uglify       from 'gulp-uglify'
import rename       from 'gulp-rename'
import notify       from 'gulp-notify'
import header       from 'gulp-header'
import autoprefixer from 'gulp-autoprefixer'
import ejs          from 'gulp-ejs'
import gutil        from 'gulp-util'


const cssLoadSrc = './src/scss/main.scss'
const jsLoadSrc = ["./src/js/core.js","./src/js/app.js"]
const mincss = 'app.css'
const minjs = 'app.js'
const ejsSrc = './src/templates/*.ejs'

const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const banner = [
  '/*! ',
    '<%= pkg.name %> ',
    `v <%= pkg.version %>  | `,
    `(c) ${new Date()}  Julian  |`,
    ' <%= pkg.homepage %> ',
    ` `,
  ' */',
  '\n'
].join('');

gulp.task('sass', () => gulp.src(cssLoadSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`./.tmp`))
    .pipe(autoprefixer({
        browsers: ['> 5%','Firefox <= 20','ie 9'],
        cascade: false
    }))
    .pipe(rename(mincss))
    .pipe(gulp.dest(`./.tmp`))
    .pipe(minifycss())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./build/css/`))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Styles  task complete' })))


gulp.task('scripts', () => gulp.src(jsLoadSrc)
    .pipe(concat(minjs))
    .pipe(gulp.dest(`./.tmp/js`))
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./build/js/`))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Scripts task complete' })));

gulp.task('ejs', () => gulp.src(ejsSrc)
    .pipe(ejs({
        msg: 'Hello!'
    }).on('error', gutil.log))
    .pipe(rename({
        extname: ".html"
    }))
    .pipe(gulp.dest('./build'))
    )

// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], () => {

    browserSync.init({
        server: `./build/`
    })

     // 看守所有.html
    gulp.watch(`./build/*.html`).on('change', reload)
    // 看守.scss 档
    gulp.watch(`./src/scss/*.scss`, ['sass'])
    gulp.watch(`./src/scss/**/*.scss`, ['sass'])
    gulp.watch(`./src/templates/**/*.ejs`, ['ejs'])
    gulp.watch(`./src/templates/*.ejs`, ['ejs'])
    gulp.watch(`./src/js/*.js`, ['scripts'])

})

gulp.task('default', ['dev'])