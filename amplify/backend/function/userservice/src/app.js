/* Amplify Params - DO NOT EDIT
  AUTH_ENDLESSCMPE28139DC59D9_USERPOOLID
  ENV
  REGION
  STORAGE_MEALPLAN_ARN
  STORAGE_MEALPLAN_NAME
  STORAGE_MEALPLAN_STREAMARN
  STORAGE_USERS_ARN
  STORAGE_USERS_NAME
  STORAGE_USERS_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const { triggerAsyncId } = require('async_hooks');
const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
const _util = require('underscore');

AWS.config.update({ region: process.env.TABLE_REGION });
const usercode = require('/opt/user');
usercode.assignClient(process.env.TABLE_REGION);
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "users";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "username";
const partitionKeyType = "S";
const sortKeyName = "usertype";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/user";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';




// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});
app.use(usercode.userMiddleWare);
// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

app.get(path, async function (req, res) {

  console.log('usercontext ', req.users);
  let response = req.users;
  response.identityid = "";
  return res.json(response);
});
app.get(path + '/myplans', async function (req, res) {
  console.log('usercontext ', req.users);
  return res.json({ activeplan: req.users.activeplan, plans: req.users.plans });
});
app.post(path + '/subscribe', async function (req, res) {
  let input = req.body;
  //check plan exists in user object?
  if (req.users.activeplan && req.users.activeplan.planid == input.mealplanId) {
    return res.json({ "status": "success", "msg": "Already Subscribed and Active" });
  }
  if (req.users.plans) {
    let mealplan = _util.find(req.users.plans, function (plan) { return plan.mealplanId == input.mealplanId });
    if (mealplan) {

      try {
        let response = await updateUserPlans(input.mealplanId, req.users.username);
        return res.json({ "status": "success", "msg": "Activated the meal plan" });
      }
      catch (err) {
        console.log('meal plan activation error ', err);
        return res.json({ "status": "failure", "msg": "Could not activate meal plan" });
      }

    }

  }
  //if yes make it active
  //else
  //check plan exists
  try {

    let response = await usercode.fetchMealPlan(process.env.STORAGE_MEALPLAN_NAME, input.mealplanId);
    if (response) {
      try {
        let response = await updateUserPlans(input.mealplanId, req.users.username);
        return res.json({ "status": "success", "msg": "Activated the meal plan" });
      }
      catch (err) {
        console.log('meal plan activation error ', err);
        return res.json({ "status": "failure", "msg": "Could not activate meal plan" });
      }
    }
  }
  catch (Err) {
    return res.json({ "status": "failure", "msg": "Could not find meal plan" });
  }
  //if yes add it to user object and update
  //else reject

  console.log('usercontext ', req.users);
  return res.json({ activeplan: req.users.activeplan, plans: req.users.plans });
});

async function updateUserPlans(mealplanId, user) {
  //change current active
  let plan = {
    activeplan: {
      mealplanId: mealplanId,
      activeon: new Date().toDateString()
    }
  }
  var params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Key: { 'username': user.username, "usertype": "user" },
    UpdateExpression: 'set #a = :x',
    ExpressionAttributeNames: { '#a': 'activeplan' },
    ExpressionAttributeValues: {
      ':x': plan.activeplan
    }
  };
  try {
    console.log('user plan update request ', params);
    user = await usercode.updateUser(params);
    if (user) {
      return res.json({ status: "success", msg: "Sent Request" });
    }
    else {

      return res.json({ status: "failure", msg: "Could not process request" });
    }
  }
  catch (err) {
    console.log('user plan update request error ', err);
    return res.json({ status: "failure", msg: "Could not process request" });
  }
}
app.post(path + '/dietitianreq', async function (req, res) {
  if (req.users.usertype === "dietitian") {
    return res.json({ status: "success", msg: "Already Dietitian" });
  }
  let user = usercode.fetchUser(process.env.STORAGE_USERS_NAME, req.users.username);
  if (user.hasOwnProperty('dietitianreq') && user.dietitianreq) {
    return res.json({ status: "success", msg: "Already Requested for upgrade to Dietitian" });
  }
  //update user
  var params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Key: { 'username': user.username, "usertype": "user" },
    UpdateExpression: 'set #a = :x',
    ExpressionAttributeNames: { '#a': 'dietitianreq' },
    ExpressionAttributeValues: {
      ':x': true
    }
  };
  try {
    console.log('user update request ', params);
    user = await usercode.updateUser(params);
    if (user) {
      return res.json({ status: "success", msg: "Sent Request" });
    }
    else {

      return res.json({ status: "failure", msg: "Could not process request" });
    }
  }
  catch (err) {
    console.log('user upgrade request error ', err);
    return res.json({ status: "failure", msg: "Could not process request" });
  }

});
app.get(path + '/dietitianreqs', async function (req, res) {
  let reqs = await usercode.fetchDietitianReqs(process.env.STORAGE_USERS_NAME);
  res.json(reqs);
});
app.post(path + '/approvedietitian',async function (req, res) {
  let input=req.body;
  let isdietitian=false;
  if(input.approve){
    //approve request;
    isdietitian=true;
  }
  let params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Key: { 'username': input.username, "usertype": "user" },
    UpdateExpression: 'set #a = :x , #b = :y',
    ExpressionAttributeNames: { '#a': 'dietitianreq' },
    ExpressionAttributeValues: {
      ':x': false,
      ':y': isdietitian
    }
  };
  try {
    console.log('user update request approval', params);
    user = await usercode.updateUser(params);
    if (user) {
      return res.json({ status: "success", msg: "Request Processed" });
    }
    else {
      return res.json({ status: "failure", msg: "Could not process request" });
    }
  }
  catch (err) {
    console.log('user upgrade request approval error ', err);
    return res.json({ status: "failure", msg: "Could not process request" });
  }
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
