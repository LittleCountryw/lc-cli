/* 
执行终端命令相关的代码
*/
const { spawn } = require('child_process')

// npm install
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    // child_process.spawn(command[, args][, options])
    const childProcess = spawn(...args)
    //将子进程输出放在process中
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn,
}
