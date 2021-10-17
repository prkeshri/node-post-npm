#!/usr/bin/env node
const { spawn, exec } = require('child_process');
const [node, me, npmid, cmd, ...args] = process.argv;
const os = require('os');
const fs = require('fs');
const uniqueHash = require("unique-hash");
let i;
let finished = false;
const flagargs = [];
while(args[0] && args[0][0] === '-') {
    flagargs.push(args.shift());
}

let tmp;
if(flagargs[0] === '-once') {
    tmp = path.join(os.tmpdir(), uniqueHash(args.join(' ')));
    if(fs.existsSync(tmp)) {
        return;
    }
    fs.writeFileSync(tmp, "");
}
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
                if(tmp) {
                    fs.unlinkSync(tmp);
                }
            } catch (e) {
            }
        }
    });}

const x = function() {
    p()
    i = setImmediate(x);
}

x();