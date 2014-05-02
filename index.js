var fs = require('fs'),
    _ = require('underscore'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    saxon = require('saxon-stream2'),
    through2 = require('through2');

module.exports = function(opts){
  opts = _.defaults(opts || {}, {timeout:5000});
  var xslt = saxon(opts.jarPath,opts.xslPath,{timeout:opts.timeout});

  function transform(file,e,next){
    var self = this;
    var path = file.path;
    fs.createReadStream(path).pipe(xslt)
      .on('data',function(cont){
        file.contents = cont;
        file.path = gutil.replaceExtension(file.path,opts.outputType);
        self.push(file);
        next();
      }).on('error',function(err){
        self.emit('error', new PluginError('gulp-saxon',err));
        next();
      });
  };
  return through2.obj(transform);
};
