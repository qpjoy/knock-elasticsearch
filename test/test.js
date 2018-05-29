var axios = require('axios');
var baseurl = 'http://103.27.108.110:9200';
var cat = '/_cat/nodes?v&pretty';
var indices = '/_cat/indices?v&pretty';
var customers = '/customers?&pretty';
var orders = '/orders?&pretty';

function mobileVersion(strings, args) {
    return strings[0] + args + strings[1];
}

var mobile_version = 2;
var mobiles = `/products/mobiles/${mobile_version}?pretty`;
var laptops = '/products_lap/laptops/1?pretty';

var no_source = '/products/mobiles/1?pretty&_source=false'
var some_source = '/products/mobiles/1?pretty&_source=name,reviews'

var updateMobile = '/products/mobiles/2/_update?pretty'
var mobile1 = {
    name: 'iphone 7',
    camera: '12MP',
    storage: '256GB',
    display: '4.7inch',
    battery: '1,960mAh',
    reviews: ['Incredibly happy after having used it for one week', 'Best iPhone so far', 'Very expensive, use Android']
};
var mobile2 = {
    name: 'Samsung Galaxy',
    camera: '8MP',
    storage: '128GB',
    display: '5.2inch',
    battery: '1,500mAh',
    reviews: ['Best Android phone', 'I love it!']

}
var mobile3 = {
    name: 'Xiaomi Note',
    camera: '10MP',
    storage: '128GB',
    display: '5.5inch',
    battery: '1,500mAh',
    reviews: ['Really love Xiaomi products', 'Too large to use easily']
}

var shoes = '/shoes/shoes/1?pretty';
var update_shoes_size = '/shoes/shoes/1/_update?pretty';
var script_plus = '/products/shoes/1/_update?pretty';

axios({
    method: 'get',
    url: baseurl + indices,
    data: {
    }
}).then(res => {
    console.log(res.data);
}).catch(err => {
    console.log(err.response.data);
})


// var laptop1 = {
//     name: 'Macbook Pro',
//     storage: '500GB',
//     RAM: '8GB',
//     display: '13inch',
//     os: 'E1 Capitan',
//     reviews: ["A little bulky but a great Mac laptop", 'The larger storage capacity is great']
// }
//
// axios({
//     method: 'put',
//     url: baseurl + shoes,
//     data: Object.assign({},mobile1,{name: 'Nike',size: 8, color: 'white'})
// }).then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err.response.data);
// })


// post add
// axios({
//     method: 'post',
//     url: baseurl + updateMobile,
//     data: {
//         doc: {
//             reviews: ["best", 'i love', 'Samsung'],
//             texture: 'smooth'
//         }
//     }
// }).then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err.response.data);
// })

// axios({
//     method: 'post',
//     url: baseurl + update_shoes_size,
//     data: {
//         script: "ctx._source.size += 2"
//     }
// }).then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err.response.data);
// })

axios({
    method: 'delete',
    url: baseurl + customers,
    data: {

    }
}).then(res => {
    console.log(res.data, res.status);
}).catch(err => {
    console.log(err.response.data, err.response.status);
}


//multiple

// get /_mget?pretty
    var mget = {
        docs: [
            {
                _index: 'products',
                _type: 'laptops',
                _id: '1'
            },
            {
                _index: 'products',
                _type: 'laptops',
                _id: '2'
            }
        ]
    }

// POST  _bulk?pretty
// {index: {_index: 'products', _type: 'shoes',_id: '3'}},
// {    name: "Puma", size: 9, color: black}
// {index: {_index: 'products', _type: 'shoes',_id: '4'}},
// {    name: "New Balance", size: 8, color: black}

// POST  /products/_bulk?pretty
// {index: { _type: 'shoes',_id: '3'}},
// {    name: "Puma", size: 9, color: black}
// {index: { _type: 'shoes',_id: '4'}},
// {    name: "New Balance", size: 8, color: black}

// POST  /products/shoes/_bulk?pretty
// {index: {_id: '3'}},    {index: { aotugenerate}}
// {    name: "Puma", size: 9, color: black}
// {index: {_id: '4'}},
// {    name: "New Balance", size: 8, color: black}


// POST /products/shoes/_bulk?pretty
// { index: {_id:3}}
// {name: 'Puma', size: 9, color: 'black'}
// { index: {_id:4}}
// {name: 'New Balance', size: 8, color: 'black'}
// {delete: {_id: '2'}}
// {create: {_id: '5'}}
// {name: 'Nike Power', size: 12, color: 'black'}
// {update: {_id: '1'}}
// {doc: {'color': 'orange'}}

// curl -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/customers/personal/_bulk?pretty&refresh' data-binary @"customers.json"
// bulk index
// {index: {}}
// {name: 'carlson Barnes', age: 34}
// {index: {}}
// {name: 'sheppard Stein', age: 39}
// {index: {}}
// {name: 'Nixon Singleton', age: 36}