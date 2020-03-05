function getStructure(path) {
    fs.readdirsync(path, function (err, list) {
        if (err) return done(err);
        console.log(list);
        // list.forEach(function (item, index) {
        //     if (fs.lstatSync(path + '/' + item).isDirectory()) {
        //         console.log();
        //     }
        // }      
    }
}

getStructure();