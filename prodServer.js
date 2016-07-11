var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

// serve the files out of ./dist as our main files
app.use(express.static('dist'));

app.all('*', function(req, res) {
    res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(port, function() {
  console.log('server starting');
});
