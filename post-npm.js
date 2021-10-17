#!/usr/bin/env node
const { spawn, exec } = require('child_process');
const [node, me, npmid, cmd, ...args] = process.argv;
let i;
let finished = false;
p = _ => {
    let k = exec(`kill -0 ${npmid}`);
    k.on('close', code => {
        if(code !== 0) {
            if(finished) {
                return;
            }
            finished = true;
            clearImmediate(i);
            try {
                spawn(cmd, args, {
                    stdio: [ 'ignore', process.stdout, 'ignore' ], 
                });
            } catch (e) {
            }
        }
    });}

const x = function() {
    p()
    i = setImmediate(x);
}

x();