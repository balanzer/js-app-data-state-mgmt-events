// Initialize modules
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var clean = require("gulp-clean");

var browsersync = require("browser-sync").create();

gulp.task("clean-scripts", function () {
  return gulp.src("dist/", { read: false, allowEmpty: true }).pipe(clean());
});

var cssMin = require("gulp-css");
gulp.task("css", function () {
  return gulp.src("src/css/*.css").pipe(cssMin()).pipe(gulp.dest("dist/css"));
});

gulp.task("js", function () {
  return gulp
    .src(["src/js/*.js"])
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("index", function () {
  return gulp.src(["src/index.html"]).pipe(gulp.dest("dist"));
});

gulp.task("html", function () {
  return gulp.src(["src/html/**/*.html"]).pipe(gulp.dest("dist/html"));
});

const injectHTML = require("gulp-inject-in-html");

gulp.task("inject-in-html", function () {
  return gulp.src("dist/**/*.html").pipe(injectHTML()).pipe(gulp.dest("dist/"));
});

// Watch task: watch SCSS and JS files for changes
gulp.task("watch", function () {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp
    .watch("src/js/**/*.js", gulp.series("js"))
    .on("change", browsersync.reload);

  gulp
    .watch("src/css/**/*.css", gulp.series("css"))
    .on("change", browsersync.reload);

  gulp
    .watch("src/html/**/*.html", gulp.series("html"))
    .on("change", browsersync.reload);

  gulp
    .watch("src/index.html", gulp.series(["index"]))
    .on("change", browsersync.reload);
});

// Default task
gulp.task(
  "default",
  gulp.series(
    // "watch",
    "clean-scripts",
    "css",
    "js",
    "html",
    "index",
    "inject-in-html"
  )
);
