let uniqueHash = require("unique-hash");
      uniqueHash = uniqueHash.default || uniqueHash;
const ps = require('ps-node');

module.exports = function(args, cb) {
    const flagargs = [];
    let i = 0;
    while(args?.[i]?.[0] === '-') {
        flagargs.push(args.shift());
    }
    if(flagargs[0] !== '-once') {
        return cb(null, 'x');
    }

    const hash = uniqueHash(args.join(' '));
    ps.lookup({
        command: 'node',
        arguments: 'post-npm',
    }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }
    
        let r = resultList.some(resultProcess => {
            // post-npm <ppid> [-once] hash
            if(resultProcess.arguments[0]?.indexOf('post-npm') > -1) {
                if(resultProcess.arguments[2] === hash) {
                    return true;
                }
            }
        });

        cb(r, hash);
    });
}