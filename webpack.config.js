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
            '<title>Weather app built with reactjs</title>',
          '</head>',
          '<body>',
            '<script src="' + data.main + '"></script>',
          '</body>',
          '<script>',
            '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){',
            '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),',
            'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)',
            '})(window,document,"script","//www.google-analytics.com/analytics.js","ga");',
            'ga("create", "UA-23679093-13", "auto");',
            'ga("send", "pageview");',
          '</script>',
        '</html>'
      ].join('')
    }
  }
});
