const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');//importação do "sourcemaps"
const uglify = require('gulp-uglify');

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/*.js'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())//para iniciar o "sourcemaps"
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))//para criar o arquivo de mapeamento onde colocaremos as pastas onde os arquivo estarão disponiveis.
        .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback){
    console.log("Executando via Gulp");
    callback();
}

function dizOi(callback){
    console.log("Olá Gulp");
    dizTchau();
    callback();
}

function dizTchau(){
    console.log("Tchau Gulp");
}

exports.default = gulp.parallel(funcaoPadrao, dizOi);
exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.watch = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false }, gulp.series(compilaSass));
}
exports.javascript = comprimeJavaScript;