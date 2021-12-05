const path = require('path')

const ejs = require('ejs')
const fs = require('fs')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  /* 
  ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string
  });
  */
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      // console.log(result)
      resolve(result)
    })
  })
}

const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  createDirSync,
  writeToFile,
}
