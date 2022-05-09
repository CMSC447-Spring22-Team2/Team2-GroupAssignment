const { spawn, exec } = require("node:child_process")
const path = require('path')

const script = spawn("python", ["-u", '../test.py'])

script.stdout.on("data", (data) => {
    console.log(data.toString());
});

script.stderr.on('data', (data) => {
    console.log(`error:${data}`);
});

script.stderr.on('close', () => {
    console.log('Closed');
});