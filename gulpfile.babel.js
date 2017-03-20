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


const cssLoadSrc = './src/scss/main.scss'
const mincss = 'app.css'

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
        browsers: ['> 1%','Firefox <= 20',''],
        cascade: false
    }))
    .pipe(rename(mincss))
    .pipe(gulp.dest(`./.tmp`))
    .pipe(minifycss())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./css/`))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Styles  task complete' })))

// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], () => {

    browserSync.init({
        server: `./`
    })

     // 看守所有.html
    gulp.watch(`./*.html`).on('change', reload)
    // 看守.scss 档
    gulp.watch(`./src/scss/*.scss`, ['sass'])
    gulp.watch(`./src/scss/**/*.scss`, ['sass'])

})

gulp.task('default', ['dev'])