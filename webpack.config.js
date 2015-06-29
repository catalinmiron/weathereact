var getConfig = require('hjs-webpack');


module.exports = getConfig({
  in: 'src/app.js',
  out: 'dist',
  clearBeforeBuild: true,
  html: function (data) {
    return {
      'index.html': [
        '<html>',
          '<head>',
            '<link href="' + data.css + '" rel="stylesheet" type="text/css" />',
          '</head>',
          '<body>',
            '<h1>Home Page</h1>',
            '<script src="' + data.main + '"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  }
});
