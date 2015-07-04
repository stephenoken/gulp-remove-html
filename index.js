var gutil = require('gulp-util');
var through2 = require('through2');
var PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-remove-html';

function gulpRemoveHtml(){
    var stream = through2.obj(function(chunk, enc, cb){
       if(chunk.isStream()){
           this.emit('error', new PluginError(PLUGIN_NAME,'Streams not supported'));
           return cb();
       }

        if(chunk.isBuffer()){
            var fileContents = chunk.contents.toString();
            //TODO refactor the patterns
            var dejectStartPattern =/(<!--\s*<([Deject]+)>\s*-->)/ig;
            var dejectEndPattern =/(<!--\s*<(\/[Deject]+)>\s*-->)/ig;

            var dejectStartIndex = dejectStartPattern.exec(fileContents);
            if(dejectStartIndex == null){
                this.emit('error', new PluginError(PLUGIN_NAME, 'File does not contain the right tag'));
                return cb();
            }
            dejectEndPattern.exec(fileContents);
            var processedFile = fileContents.substring(0,dejectStartIndex.index);
            processedFile = processedFile.concat(fileContents.substring(dejectEndPattern.lastIndex,fileContents.length));
            chunk.contents = new Buffer(processedFile);
        }
        this.push(chunk);
        cb();
    });
    return stream;
}
module.exports = gulpRemoveHtml;
