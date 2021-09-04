/// <binding AfterBuild='scripts' />
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./scripts/tsconfig.json");

gulp.task("scripts", function () {
    return tsProject.src()
        .pipe(tsProject()).js.pipe(gulp.dest('./wwwroot/scripts'));
});

