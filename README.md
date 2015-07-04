# gulp-remove-html
Remove HTML code when the html files go into production.
## Usage

First, install `gulp-remove-html` as a development dependency:

```shell
npm install --save-dev gulp-remove-html
```

Then, add it to your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var gulpRemoveHtml = require('gulp-remove-html');

gulp.task('build-prod', function () {
  return gulp.src('files/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/views'));
});
```
## Changelog

#####1.0.0
- initial release
