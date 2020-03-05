const esb = require('elastic-builder');

const requestBody = new esb.requestBodySearch().query(
    esb.matchQuery('message', 'this is a test')
);

const bodyToJSON = requestBody.toJSON();
console.log(bodyToJSON);