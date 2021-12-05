const { program } = require('commander')
const {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
} = require('./actions')
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a floder')
    .action(createProjectAction) //action参数为void函数或者promise

  program
    .command('addCpn <name>')
    .description(
      'add vue component,eg:lc addCpn HelloWorld [-d src/components]'
    )
    .action((name) => {
      addComponentAction(name, program.opts().dest)
    })

  program
    .command('addPage <page>')
    .description('add vue page and router,eg:lc addPage Home [-d src/pages]')
    .action((page) => {
      addPageAndRoute(page, program.opts().dest)
    })
  
  program
    .command('addstore <store>')
    .description(
      'add vuex module and types eg:lc addstore Login [-d src/store/modules]'
    )
    .action((store) => {
      addStoreAction(store, program.opts().dest)
    })
  
}
module.exports = createCommands
