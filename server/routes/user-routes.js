const express = require("express");
const router = express.Router();

const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
};
AWS.config.update(awsConfig);
//Connect with the local DynamoDB instance - DocumentClient class - use native JavaScript objects to interface with the dunamodb service object
const dynamodb = new AWS.DynamoDB.DocumentClient();
//Table value - Thoughts
const table = "Thoughts";

//ROUTES

//GET /users - route - retrieve all user's thoughts
router.get("/users", (req, res) => {
  const params = {
    TableName: table,
  };
  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // an error occurred
    } else {
      res.json(data.Items);
    }
  });
});

// GET - specific user's thoughts
router.get("/users/:username", (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    //Retrieve all thoughts from a specific user
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
    },
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
    ProjectionExpression: "#th, #ca",
    ScanIndexForward: false,
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Query succeeded.");
      res.json(data.Items);
    }
  });
});

//POST /api/users

// Create new user at /api/users
router.post('/users', (req, res) => {
    const params = {
      TableName: table,
      Item: {
        username: req.body.username,
        createdAt: Date.now(),
        thought: req.body.thought,
      },
    };
    // database call - PUT method - to add an item to the Thoughts table
    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          res.status(500).json(err); // an error occurred
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          res.json({"Added": JSON.stringify(data, null, 2)});
        }
      });
    });  
  
module.exports = router;
