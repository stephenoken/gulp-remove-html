var gutil = require('gulp-util');
var through2 = require('through2');
var PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-remove-html';
var indices = [];

function gulpRemoveHtml(){
    var stream = through2.obj(function(chunk, enc, cb){
        //Does not support Streams
       if(chunk.isStream()){
           this.emit('error', new PluginError(PLUGIN_NAME,'Streams not supported'));
           return cb();
       }
        if(chunk.isBuffer()){
            var fileContents = chunk.contents.toString();
            /*
            The regular expression searches for a pattern that matches the open closing tags of deject.
            NOTE That these tags must be commented out for the plugin to reconise them.
            */
            var dejectPatternRegex =/<!--\s*<(?:\/)?[Deject]+>\s*-->/ig;

            while ((result = dejectPatternRegex.exec(fileContents))) {
              if (indices.length % 2) {
                indices.push(dejectPatternRegex.lastIndex);
              }else {
                indices.push(result.index);
              }
            }
            if (indices.length === 0) {
              this.emit('error', new PluginError(PLUGIN_NAME, 'File does not contain the right tag'));
              return cb();
            }

            var processedFile = fileContents;
            while(indices.length != 0){
              var endOfFile  = processedFile.substring(popIndice(),processedFile.length);
              processedFile = processedFile.substring(0,popIndice()).concat(endOfFile);
            }
            chunk.contents = new Buffer(processedFile);
        }
        this.push(chunk);
        cb();
    });
    return stream;
}

function popIndice() {
  var lastIndice = indices[indices.length -1];
  indices.pop();
  return lastIndice;
}
module.exports = gulpRemoveHtml;
