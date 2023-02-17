// imports aws-sdk package
const AWS = require('aws-sdk');

// modify the AWS config - region
AWS.config.update({
    region: 'us-east-2',
  });

// DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

//Params object - holds the schema and metadata of the table
const params = {
    TableName: 'Thoughts',
    KeySchema: [
      { AttributeName: 'username', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key - orders thoughts by most recent entry
    ],
    AttributeDefinitions: [
      { AttributeName: 'username', AttributeType: 'S' }, //String
      { AttributeName: 'createdAt', AttributeType: 'N' }, //Number
    ],
    //Write and Read Capacity 
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

