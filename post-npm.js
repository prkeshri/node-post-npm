const { spawn } = require('child_process');
const [node, me, npmid, ...args] = process.argv[2];
let i;
p = _ => {
    let k = (`kill -0 ${npmid}`);
    k.on('close', code => {
        if(code !== 0) {
            clearImmediate(i);
            spawn(args.join(' '), {
                stdio: [ 'ignore', process.stdout, 'ignore' ], 
            });
        }
    });}

const x = function() {
    p()
    i = setImmediate(x);
}

x();