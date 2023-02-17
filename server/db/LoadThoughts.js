// imports aws-sdk package
const AWS = require('aws-sdk');

//import fs package
const fs = require('fs');


AWS.config.update({
    region: 'us-east-2',
  });
  //DocumentClient () class to create dynamodb service object
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
  });


console.log('Importing thoughts into DynamoDB. Please wait.');
const allUsers = JSON.parse(
  fs.readFileSync('./server/seed/users.json', 'utf8'),
);
  