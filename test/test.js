var fs = require('fs'),
    test = require('tap').test,
    gutil = require('gulp-util');
var saxon = require('../');

test('gulp-saxon test',function(t){
  var xml = new gutil.File({
    cwd: __dirname,
    base: [__dirname,'fixtures'].join('/'),
    path: [__dirname,'fixtures','test.xml'].join('/'),
    contents: fs.readFileSync([__dirname,'fixtures','test.xml'].join('/'))
  });

  var s = saxon({
    jarPath: [__dirname,'..','vendor','saxon9he.jar'].join('/'),
    xslPath: [__dirname,'fixtures','test.xsl'].join('/'),
    outputType: '.txt'
  });

  s.on('data',function(out){
    t.equal(out.path,[__dirname,'fixtures','test.txt'].join('/'));
    t.equal(out.contents+'','my name');
    t.end();
  });

  s.write(xml);
});

test('gulp-saxon timeout test',function(t){
  var xml = new gutil.File({
    cwd: __dirname,
    base: [__dirname,'fixtures'].join('/'),
    path: [__dirname,'fixtures','test.xml'].join('/'),
    contents: fs.readFileSync([__dirname,'fixtures','test.xml'].join('/'))
  });

  var s = saxon({
    jarPath: [__dirname,'..','vendor','saxon9he.jar'].join('/'),
    xslPath: [__dirname,'fixtures','inf.xsl'].join('/'),
    outputType: '.txt',
    timeout: 1000
  });

  s.on('error',function(err){
    t.equal(err.name,'Error');
    t.end();
  });

  s.write(xml);
});

test('gulp-saxon error test',function(t){
  var xml = new gutil.File({
    cwd: __dirname,
    base: [__dirname,'fixtures'].join('/'),
    path: [__dirname,'fixtures','error.xml'].join('/'),
    contents: fs.readFileSync([__dirname,'fixtures','error.xml'].join('/'))
  });

  var s = saxon({
    jarPath: [__dirname,'..','vendor','saxon9he.jar'].join('/'),
    xslPath: [__dirname,'fixtures','test.xsl'].join('/'),
    outputType: '.txt'
  });

  s.on('error',function(err){
    t.equal(err.name,'Error');
    t.end();
  });

  s.write(xml);
});
