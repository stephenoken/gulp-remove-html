var gutil = require('gulp-util');
var through2 = require('through2');
var PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-remove-html';

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

            var dejectResult = dejectPatternRegex.exec(fileContents);
            if(dejectResult == null){
                this.emit('error', new PluginError(PLUGIN_NAME, 'File does not contain the right tag'));
                return cb();
            }
            /*
            The exec() method is called a second time to find the closing tag.
            */
            dejectPatternRegex.exec(fileContents);
            
            var processedFile = fileContents.substring(0,dejectResult.index);
            processedFile = processedFile.concat(fileContents.substring(dejectPatternRegex.lastIndex,fileContents.length));
            chunk.contents = new Buffer(processedFile);
        }
        this.push(chunk);
        cb();
    });
    return stream;
}
module.exports = gulpRemoveHtml;
