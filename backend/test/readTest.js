const {includes} = require('lodash');

let obj = {
  name: '/',
  url: '/',
  children: [
    {
      name: '/markdown',
      url: '/markdo',    
    }
  ]
}

console.log(obj.children.includes('markdo'));