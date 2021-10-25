#!/usr/bin/env node
const child_process= require('child_process');
const path = require('path');
const post_npm_script = path.join(__dirname, 'post-npm.js');
const check_ps = require('./check-ps');

const [node, me, ...args] = process.argv;

check_ps(args, (err, hash) => {
    if(err) {
        return;
    }
    args.unshift(process.ppid, hash);
    const child = child_process.spawn(post_npm_script, 
        args, {
            detached: true,
            stdio: [ 'ignore', process.stdout, 'ignore' ], 
        }
    );

    child.unref();
});