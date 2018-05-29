Object.keys(Array.prototype.reduce.apply("aaabbcccdd", function(acc, cur){
    return acc[cur]=acc([cur]||0)++
},{} )).map(function(k, i, arr) {return "" + k + arr[k]}).join("")