var https = require('https')

var options = {
  'method': 'GET',
  'hostname': '5cbef81d06a6810014c66193.mockapi.io',
  'path': '/api/comments',
  'headers': {
  }
}

var req = https.request(options, function (res) {
  var chunks = []

  res.on(`data`, function (chunk) {
    chunks.push(chunk)
  })

  res.on(`end`, function (chunk) {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })

  res.on(`error`, function (error) {
    console.error(error)
  })
})

req.end()
