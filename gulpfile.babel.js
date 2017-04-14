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
const loadingSrc = './src/scss/loading.scss'

const libJs = [
                "./src/libs/jq.js",
                "./src/libs/Cookie.js",
                "./src/libs/migrate.js",
                "./src/libs/Device.js",
                "./src/libs/resize.js",
                "./src/libs/easing.js",
                "./src/libs/TouchSwipe.js",
                "./src/libs/form-validation.js",
                "./src/libs/Form.js",
                "./src/libs/Count.js",
                "./src/libs/Swiper.js",
                "./src/libs/Parallax.js",
                "./src/libs/WOW.js",
                "./src/libs/Owl.js",
                "./src/libs/Isotope.js",
                "./src/libs/PhotoSwipe.js",
                "./src/libs/Navbar.js",
                "./src/libs/Twitter.js",
                "./src/libs/Waypoints.js",
                "./src/libs/UIToTop.js",
                "./src/libs/ScrollTo.js",
                "./src/libs/Bootstrap.js",
                "./src/libs/RDInputLabel.js",
                "./src/libs/Select2.js",
                "./src/libs/google-map.js",
                "./src/libs/Stepper.js",
                "./src/libs/Abstract.js",
                "./src/libs/Countdown.js",
                "./src/libs/Moment.js",
                "./src/libs/Datetimepicker.js",
                "./src/libs/TimeCircles.js",
                "./src/libs/Slick.js",
                "./src/libs/ProgressBar.js",
                "./src/libs/click-events.js",
                "./src/libs/Hammer.js",
                "./src/libs/Bridget.js",
                "./src/libs/mag.js",
                "./src/libs/mag-jquery.js",
                "./src/libs/Magnific.js",    
            ]

const appjs = ["./src/js/func.js","./src/js/core.js","./src/js/app.js"]

const jsLoadSrc = libJs.concat(appjs)

console.log(jsLoadSrc)

const mincss = 'app.css'
const loadingName = 'loading.css'
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


gulp.task('loading', () => gulp.src(loadingSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`./.tmp`))
    .pipe(autoprefixer({
        browsers: ['> 5%','Firefox <= 20','ie 9'],
        cascade: false
    }))
    .pipe(rename(loadingName))
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
gulp.task('dev', ['sass','loading'], () => {

    browserSync.init({
        server: `./build/`
    })

     // 看守所有.html
    gulp.watch(`./build/*.html`).on('change', reload)
    // 看守.scss 档
    gulp.watch(`./src/scss/*.scss`, ['sass','loading'])
    gulp.watch(`./src/scss/**/*.scss`, ['sass','loading'])
    gulp.watch(`./src/templates/**/*.ejs`, ['ejs'])
    gulp.watch(`./src/templates/*.ejs`, ['ejs'])
    gulp.watch(`./src/js/*.js`, ['scripts'])

})

gulp.task('default', ['dev'])