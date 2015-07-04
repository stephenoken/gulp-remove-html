var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var fileContents = "<body> <p> Important content!!! </p><!--<Deject>--><p>Shouldn't be here!!!!!</p><!--</Deject>--></body>";
var removeHtml = require('../index.js');
describe("gulp-remove-html", function () {
    it('should find match', function (done) {
        var fakeFile = new File({
            contents: new Buffer(fileContents)
        });

        var myRemoveHtml = removeHtml();

        myRemoveHtml.write(fakeFile);

        myRemoveHtml.once('data', function(file) {
            assert(file.isBuffer());
            assert.equal(file.contents.toString('utf8'), '<body> <p> Important content!!! </p></body>');
            done();
        });
    });
});