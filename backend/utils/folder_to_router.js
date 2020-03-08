const {client } = require('./elasticsearch.config');

var fs = require('fs'),
  path = require('path');
var md = require('markdown-it')({
  html: true,
  // breaks: false,
  linkify: true,
  typographer: true
});

const markdownItAnchor = require('markdown-it-anchor');
const cheerio = require('cheerio');
md.use(markdownItAnchor, {
  level: 1,
  // slugify: string => string,
  permalink: false,
  // renderPermalink: (slug, opts, state, permalink) => {},
  permalinkClass: 'header-anchor',
  permalinkSymbol: '¶',
  permalinkBefore: false
})

const version = 'v1';
const index = 'lilith_api';
const { flatMap, map, set } = require('lodash');

var folders = {};
var files = [];
var structure = structure = {
  name: '/',
  url: '/',
  children: []
};
var outputText = '';
var markdownText = '';
var depth = 0;
var exported = false;
var outputFileName = 'directoryList.md';
var searchPath = path.resolve(__dirname, '../marked');
var key = searchPath;//.replace(/\//g,'');
var startFolder = searchPath.split('/')[searchPath.split('/').length - 2];
var startDepth = searchPath.split('/').length - 1;
var currentWorkingDirectory = searchPath || process.cwd();

var folderIgnoreList = [
  '.git',
  'node_modules'
];

var currentPath = '/';

var getFolders = function (folderPath, currentPathInherit) {
  fs.readdir(folderPath, function (err, list) {
    if (err) return done(err);
    list.forEach(function (item, index) {
      if (fs.lstatSync(folderPath + '/' + item).isDirectory() &&
        folderIgnoreList.indexOf(item) === -1) {
        var folderDepth = folderPath.split('/').length;
        if (folderDepth > depth) {
          depth = folderDepth;
        }
        var uniqueKey = folderPath + '/' + item.replace(/\//g, '');
        // const currentPath = (currentPathInherit === '/') ? ('/' + item) : (currentPathInherit + '/' + item);
        const currentPath = (currentPathInherit === '/') ? ('/' + item) : (currentPathInherit + '/' + item);
        console.log(currentPathInherit, ' see the first inherit');

        folders[uniqueKey] = {
          depth: folderDepth,
          parentFolder: folderPath,
          parentPath: currentPathInherit,
          currentPath,
          path: folderPath + '/' + item,
          name: item,
          folders: [],
          files: [],
          logged: false,
          parsed: false,
          marked: false
        };
        // getFolders(path + '/' + item, true);
        getFolders(folderPath + '/' + item, (currentPathInherit === '/') ? ('/' + item) : (currentPathInherit + '/' + item));
      }
    });
    getFilesInFolders();
  });
};

var getFiles = function (filePath, key) {
  fs.readdir(filePath, function (err, list) {
    list.forEach(function (item) {
      if (!fs.lstatSync(filePath + '/' + item).isDirectory()) {
        if (folders[key].files.length === 0 || folders[key].files.indexOf(item) === -1) {
          folders[key].files.push(item);

          // TODO index files. {name, type, marked, content, v, date}  

          const currentPath = folders[key].currentPath + '/' + item;
          // let url = '';
          // if(currentPath.endsWith('.md')) {            
          //   url = currentPath.substr(0, currentPath.length - 3)
          //   console.log(url, ' - - - - - - this is key file', filePath + '/' + item);
          // }



          const uniqueKey = filePath + '/' + item.replace(/\//g, '');

          const fileUrl = path.resolve(filePath + '/' + item);
          console.log(fileUrl);
          let data = fs.readFileSync(fileUrl, 'utf8');
          let marked = md.render(data);


          let chapters = splitChapters(marked, currentPath);                  
          files.push({
            name: item,
            url: currentPath,
            parentUrl: folders[key].currentPath,
            type: 'file',
            marked,
            content: data,
            folders: [],
            files: [],
            chapters,
            v: version,
            date: new Date()
          })
          // client.info().then((info) => {
          //   console.log(info, ' - - - - -this is info', indexObj);
          // });
        }
      } else {
        if (folders[key].folders.indexOf(item) === -1) {
          folders[key].folders.push(item);
        }
      }
    });
    folders[key].parsed = true;
    listFolders();
  });
};

var getFilesInFolders = function () {
  for (var key in folders) {
    if (folders.hasOwnProperty(key)) {
      getFiles(folders[key].path, key);
    }
  }
};

var listFolders = function () {
  var allParsed = true;
  var numFolders = 0;
  for (var key in folders) {
    if (folders.hasOwnProperty(key)) {
      numFolders++;
      if (!folders[key].logged || !folders[key].parsed) {
        allParsed = false;
      }
      if (folders[key].parsed && !folders[key].logged) {
        folders[key].logged = true;
        // console.log(JSON.stringify(folders[key],null,2));
      }
    }
  }
  if (allParsed && !exported) {
    exported = true;
    // console.log('Number of folders: ' + numFolders);
    // generateText();
    generateMarkdown();
    // console.log(JSON.stringify(folders, null, 2));

    // TODO index folders
    let foldersArr = map(folders, folderObj => folderObj);
    const bulkFolders = foldersArr.map((folder) => {
      return {
        name: folder.name,
        url: folder.currentPath,
        parentUrl: folder.parentPath,
        type: 'folder',
        marked: null,
        content: null,
        folders: folder.folders.map(_folder => {
          return {
            name: _folder,
            url: (folder.currentPath === '/') ? ('/' + _folder) : (folder.currentPath + '/' + _folder)
          }
        }),
        files: folder.files.map(_file => {
          return {
            name: _file,
            url: (folder.currentPath === '/') ? ('/' + _file) : (folder.currentPath + '/' + _file)
          }
        }),
        v: version,
        date: new Date()
      }
    });

    console.log('Happy injecting');

    // setTimeout(() => {
    const bodyStructure = [
      { index: { _index: index, _id: 'structure' } },
      {
        name: '_structure',
        url: '/_structure',
        parentUrl: null,
        type: null,
        marked: null,
        content: JSON.stringify(structure),
        folders: [],
        files: [],
        v: version,
        date: new Date()
      }
    ];
    const bodyFolder = flatMap(bulkFolders, doc => [{ index: { _index: index, _id: doc.url } }, doc])
    const bodyFile = flatMap(files, doc => [{ index: { _index: index, _id: doc.url } }, doc]);
    const bodyAll = bodyStructure.concat(bodyFolder, bodyFile);

    console.log(bodyAll, JSON.stringify(structure));
    client.bulk({ refresh: true, body: bodyAll }).then((res) => {
      console.log(`Structure inject success!`, res);
    }).catch((err) => {
      console.log(err, '- - - - - - client error');
    });
    // },1000);
  }
};

var generateText = function () {
  outputText += 'Files and folders in ' + searchPath + '\n\n';
  for (var i = 0; i < depth + 1; i++) {
    for (var key in folders) {
      if (folders.hasOwnProperty(key)) {
        var folder = folders[key];
        if (folder.depth === i) {
          var name = folder.path.split(searchPath)[1];
          outputText += name + '\n';
          for (var j = 0; j < name.length; j++) {
            outputText += '-';
          }
          outputText += '\n';
          if (folder.files.length === 0) {
            outputText += 'No files in folder' + '\n';
          }
          for (var j = 0; j < folder.files.length; j++) {
            outputText += folder.files[j] + '\n';
          }
          outputText += '\n\n';
        }
      }
    }
  }
  fs.writeFile(outputFileName, outputText, function (err) {
    if (err) return;
    // console.log(outputFileName +  '>' + outputText);
  });
};

var addFileName = function (name, indent) {
  var indent = indent + 4;
  markdownText += '';
  for (var i = 0; i < indent; i++) {
    // if(i % 3 === 0){
    // markdownText += '|';
    // } else {
    markdownText += ' ';
    // }
  }
  markdownText += '|-- ' + name + '\n';
};

var addFolderName = function (name, index) {
  if (folders[name] !== undefined) {
    if (folders[name].marked) {
      return;
    }
    var indent = (folders[name].depth - startDepth) * 4;
    markdownText += '';
    for (var i = 0; i < indent; i++) {
      markdownText += ' ';
      // if(folders[name].folders.length > 0){
      //   if(i % 3 === 0){
      //     markdownText += '|';
      //   } else {
      //     markdownText += ' ';
      //   }
      // } else {
      //   markdownText += ' ';
      // }
    }
    if (index === 1) {
      console.log('adding root folder');
      markdownText += '|-- ' + startFolder + '\n';
    } else {
      markdownText += '|-- ' + folders[name].name + '\n';
    }
    // console.log('Folders[name]:');
    // console.log(folders[name]);
    folders[name].files.forEach(function (f) {
      addFileName(f, indent);
    });
    folders[name].marked = true;
    folders[name].folders.forEach(function (f) {
      var path = name + '/' + f;
      addFolderName(path, 2);
    });
  }
};

var generateMarkdown = function () {
  addFolderName(key, 1);

  addSiblingfolderConnections();

  fs.writeFile(currentWorkingDirectory + '/' + outputFileName, markdownText, function (err) {
    if (err) return;
    // console.log(outputFileName +  '>' + outputText);
  });
};

String.prototype.replaceAt = function (index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
}

var addSiblingfolderConnections = function () {
  var lines = markdownText.split('\n');
  for (var i = 1; i < lines.length; i++) {
    var line1 = lines[i - 1];
    var line2 = lines[i];
    for (var j = 0; j < line2.length; j++) {
      var char1 = line1.charAt(j);
      var char2 = line2.charAt(j);
      // console.log('comparing ' + char1 + ' with ' + char2);
      // Search for folder below to connect to
      var foundSibling = false;
      for (var k = i; k < lines.length; k++) {
        var charBelow = lines[k].charAt(j);
        if (charBelow !== '|' && charBelow !== ' ') {
          break;
        }
        if (charBelow === '|') {
          foundSibling = true;
        }
      }
      if (foundSibling && char1 === '|' && char2 === ' ') {
        line2 = line2.replaceAt(j, '|');
        lines[i] = line2;
      }
    }
  }
  console.log('lines');
  // console.log(lines);
  markdownText = lines.join('\n');
};

function getStructure(path, currentPathInherit, structure) {
  fs.readdir(path, { encoding: "utf8" }, function (err, list) {
    if (err) return console.log(err);
    // console.log(list);
    list.forEach(function (item, index) {
      const currentPath = (currentPathInherit === '/') ? ('/' + item) : (currentPathInherit + '/' + item);

      let ii;

      if (fs.lstatSync(path + '/' + item).isDirectory()) {
        // console.log(`${item} is folder - - -  -${currentPath}`);

        ii = {
          name: item,
          url: currentPath,
          type: 'folder',
          children: [],
        }
        structure.children.push(ii);
        getStructure(path + '/' + item, currentPath, structure.children[index]);
      } else {
        // console.log(`${item} is file - - -  ${currentPath}, ----- ${_children}`);
        ii = {
          name: item,
          url: currentPath,
          type: 'file'
        }
        structure.children.push(ii);
      }
    })
  })
}


function splitChapters(html, url) {
  // load the raw HTML
  // it needs to all be wrapped in *one* big wrapper
  const $ = cheerio.load(`<div id="_body">${html}</div>`);
  // the end goal
  const blocks = [];
  // the buffer
  const section = cheerio
      .load("<div></div>", { decodeEntities: false })("div")
      .eq(0);

  const iterable = [...$("#_body")[0].childNodes];
  let c = 0;
  iterable.forEach(child => {
      if (["h1", "h2", "h3", "h4", "h5", "h6", "h7"].indexOf(child.tagName) >= 0) {
          if (c) {
              blocks.push(section.clone());
              section.empty();
              c = 0; // reset the counter
          }
      }
      c++;
      section.append(child);
  });
  if (c) {
      blocks.push(section.clone());
  }
  const blocksAsObj = blocks.map(block => {
      console.log(block[0]['children'][0], ' - - this is block')
      let id = '';
      let text = '';
      if(block && block[0] && block[0]['children'] && block[0]['children'][0]) {
          let temp = block[0]['children'][0];
          if(temp['attribs'] && temp['attribs']['id']) {
              id = temp['attribs']['id'];
          }
          if(temp['children'] && temp['children'][0]) {
              text = temp['children'][0]['data'];
          }        
      }
      return {
          url: `${url}`,
          anchor: `#${id}`,
          title: `${text}`,
          chapter: block.html()
      }
  });
  return blocksAsObj;
}

folders[key] = {
  depth: searchPath.split('/').length - 1,
  parentFolder: null,
  parentPath: null,
  currentPath: currentPath,
  path: searchPath,
  name: searchPath.split('/')[searchPath.split('/').length - 1],
  folders: [],
  files: [],
  logged: false,
  parsed: false,
  marked: false
};
fs.readdir(searchPath, function (err, list) {
  list.forEach(function (item) {
    if (!fs.lstatSync(searchPath + '/' + item).isDirectory()) {
      if (folders[key].files.indexOf(item) === -1) {
        folders[key].files.push(item);
      }
    }
  });
  folders[key].parsed = true;
});

getStructure(searchPath, currentPath, structure);
setTimeout(() => {
  getFolders(searchPath, currentPath);
}, 1000);
