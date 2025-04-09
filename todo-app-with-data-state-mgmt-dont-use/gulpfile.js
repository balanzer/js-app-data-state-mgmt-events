var gulp = require("gulp");
var series = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var terser = require("gulp-terser");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var paths = {
  pages: ["src/**/*.html", "src/**/*.css"],
};

var clean = require("gulp-clean");

gulp.task("clean-scripts", function () {
  return gulp.src("./dist/", { read: false }).pipe(clean());
});

gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
gulp.task(
  "js-build",
  gulp.series(gulp.parallel("copy-html"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/scripts/app.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(terser())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("dist"));
  })
);

const injectHTML = require("gulp-inject-in-html");
gulp.task("inject-in-html", function () {
  return gulp.src("dist/**/*.html").pipe(injectHTML()).pipe(gulp.dest("dist/"));
});

var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    reloadDelay: 1500,
  });

  gulp.watch("./src/**/*.html", gulp.series(["build"])).on("change", reload);
  gulp.watch("./src/**/*.css", gulp.series(["build"])).on("change", reload);
  gulp.watch("./src/**/*.ts", gulp.series(["build"])).on("change", reload);
});

gulp.task("build", gulp.series("clean-scripts", "js-build", "inject-in-html"));

gulp.task("default", gulp.series("build", "browser-sync"));
