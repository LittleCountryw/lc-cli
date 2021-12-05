const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

const createProjectAction = async (project) => {
  console.log('lc helps you create your project...')
  // 1.clone项目
  /* download(vueRepo, project, { clone: true }).then((res) => {
    console.log(res) //undefined
  }) */

  await download(vueRepo, project, { clone: true })

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3.运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 4.打开浏览器
  open('http://localhost:8080/')
}

const addComponentAction = async (name, dest = 'src/components') => {
  // 1.编译ejs模板 result
  const data = { name, lowerName: name.toLowerCase() }
  const result = await compile('vue-component.ejs', data)

  // 2.写入文件操作
  // 1)判断路径所有文件夹是否存在
  if (createDirSync(dest)) {
    finalPath = path.resolve(dest, `${name}.vue`)
    // console.log(finalPath)
    // (2)将content放入
    writeToFile(finalPath, result)
  }
}

const addPageAndRoute = async (name, dest = 'src/pages') => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile('vue-component.ejs',data)
  const routeResult = await compile('vue-router.ejs',data)

  // 2.写入文件操作
  // 与addCpn不同的是每一个Page都有一个文件夹,所以在外部定义path
  const targetDest = path.resolve(dest,name.toLowerCase())
  if(createDirSync(targetDest)){
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }

}

const addStoreAction = async (name, dest = 'src/store/modules') => {
  // 1.编译ejs模板
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})
  const targetDest = path.resolve(dest, name.toLowerCase())
  if(createDirSync(targetDest)) {
    const targetRoutePath = path.resolve(targetDest, `${name}.js`)
    const targetTypePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetRoutePath, storeResult)
    writeToFile(targetTypePath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
}
