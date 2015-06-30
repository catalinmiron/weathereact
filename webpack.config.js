var getConfig = require('hjs-webpack');


module.exports = getConfig({
  in: 'src/app.js',
  out: 'dist',
  clearBeforeBuild: true,
  html: function (data) {
    return {
      'index.html': [
        '<!DOCTYPE html>',
        '<html lang="en">',
          '<head>',
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<link href="' + data.css + '" rel="stylesheet" type="text/css" />',
          '</head>',
          '<body>',
            '<script src="' + data.main + '"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  }
});
