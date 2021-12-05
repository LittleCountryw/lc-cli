#!/usr/bin/env node
// 1.根据shebang配置的环境执行文件
// 2.配置package.json 的bin,告诉执行的是哪条指令
// 3.执行npm link 环境变量与配置bin的启动连接起来，将why作为终端命令配置到环境变量
// 4.为了使输入-version -hlep此类命令显示不同内容使用commander
const { program } = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')
/* 
commander的使用：
1.* 定义版本号 program.version
2.* 解析终端命令 program.parse(process.argv)
3.* 添加options(可选) program.option()
4.* 创建指令 program.command().description().action()
*/
// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()
// 创建其他指令
createCommands()
// 告诉commander解析终端输入
program.parse(process.argv)
