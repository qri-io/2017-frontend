var AWS = require('aws-sdk'),
	 path = require('path'),
	 fs = require('fs'),
	 s3 = new AWS.S3()

fs.readdir(path.join(__dirname, '..', 'dist'), function (err, files) {
  if (err) throw err
  var count = files.length

  function done () {
    if (--count === 0) process.exit()
  }

  files.forEach(function (fileName) {
    fs.readFile(path.join(__dirname, '..', 'dist', fileName), function (err, data) {
		  if (err) { throw err }

      s3.putObject({
        Bucket: 'static.qri.io',
        ContentType: 'application/json',
        Key: 'js/' + fileName,
        ACL: 'public-read',
        Body: data
      }, function (err, resp) {
        if (err) { throw err }
        console.log(resp.ETag)
        done()
      })
    })
  })
})
