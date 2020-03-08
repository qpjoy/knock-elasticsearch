const _ = require('lodash');

let ttt = _.flattenDeep([1333, {a:'a',b: [1,3,4]}, [{a:1}, [{tty:"tttt"}, [{tt:"tttt"}]], 5]]);
console.log(ttt)