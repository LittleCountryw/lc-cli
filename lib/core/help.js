const { program } = require('commander')

const helpOptions = () => {
  // 添加自己的options
  program.option(
    '-d --dest <dest>',
    'a destination folder eg:-d /src/components'
  )
  program.option('-f --framework<framework>', 'your framework')
  // program.addHelpText用于自定义帮助选项
  /* program.addHelpText(
    'after',
    `
  Examples:
  lc --help
  lc -h
  `
  ) */
}

module.exports = helpOptions
