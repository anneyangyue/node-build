var project = {
  'name': 'dist',
  'projectData': [
    {
      'name': 'js',
      'type': 'dir'
    }, {
      'name': 'css',
      'type': 'dir'
    }, {
      'name': 'index.html',
      'type': 'file',
      'content': '<html lang="en"><head>\n\t<title>Document</title>\n</head>\n<body>\n\t<div>hello</div>\n</body>\n</html>'
    }

  ]
}

var fs = require('fs')

if (project.name) {
  var dirName = project.name
  fs.mkdirSync(dirName)
  project.projectData.forEach(function (item) {
    if (item.type === 'dir') {
      fs.mkdirSync(dirName + '/' + item.name)
    } else {
      fs.writeFileSync(dirName + '/' + item.name, item.content)
    }
  })
  fs.watch('./src', function (evenType, filename) {
    fs.readdir('./src', function (err, fileList) {
      if (err) {
        console.log(err)
      } else {
        var jsContent = ''
        fileList.forEach(function (item) {
          var data = fs.readFileSync('./src/' + item)
          jsContent += data.toString() + '\n'
        })
        fs.writeFileSync(dirName + '/js/index.js', jsContent)
      }
    })
  })
}
