var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var fileContents = "<body> <p> Important content!!! </p><!--<Deject>--><p>Shouldn't be here!!!!!</p><!--</Deject>--></body>";
var removeHtml = require('../index.js');
describe("gulp-remove-html", function () {

    it('should remove match', function (done) {
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
    it('should remove multiple matches', function (done) {
        fileContents += "<!--<Deject>--><p>Shouldn't be here!!!!!</p><!--</Deject>-->";
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

    // it('should be in development mode', function (done) {
    //   var env  = process.env.NODE_ENV;
    //   assert.equal(env,'dev','Is not in development mode');
    //   done();
    // });
    // it('should accept a parameter', function (done) {
    //
    //     var myRemoveHtml = removeHtml();
    //
    //     assert.notEqual(myRemoveHtml, undefined);
    //     done();
    // });
});
