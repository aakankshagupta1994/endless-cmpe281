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
const { v4: uuidv4 } = require('uuid');

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
  let transid = uuidv4();
  let input = req.body;
  //check plan exists in user object?
  //get the current userplans
  let plans = [];
  if (req.users.plans && req.users.plans.length > 0) {
    console.log(transid + " user already has plans");
    plans = req.users.plans;
    //turn off all plans
    plans = _util.forEach(plans, (plan) => plan.active = false);
    let fplan = _util.find(plans, (plan) => {
      return plan.mealplanid == input.mealplanid
    });
    //find if user already has that plan
    if (fplan) {
      //if yes turn it on and change date
      //update user and return 
      plans = _util.forEach(plans, (plan) => {
        if (plan.mealplanid == input.mealplanid) {
          plan.active = true;
          plan.subscribedOn = ((new Date().getMonth() + 1).toString()) + '/' + (new Date().getDate().toString()) + '/' + (new Date().getFullYear().toString());
        }
      });
      try {
        let activeuserresponse = await updateUserPlans(plans, req.users, transid);
        if (activeuserresponse.status == "success")
          return res.json({ "status": "success", "msg": "Activated the meal plan " + transid });
        else
          return res.json({ "status": "failure", "msg": "Could not activate meal plan  " + transid });
      }
      catch (err) {
        console.log('meal plan activation error ', err);
        return res.json({ "status": "failure", "msg": "Could not activate meal plan already present " + transid });
      }
    }

  }
  try {
    //check if requested plan exists
    let mealplanresponse = await usercode.fetchMealPlan(process.env.STORAGE_MEALPLAN_NAME, input.mealplanid);
    if (mealplanresponse) {
      try {
        console.log(transid + ' meal plan found ' + mealplanresponse);
        //if yes add entry to plans with date and activate
        plans.push({
          mealplanid: mealplanresponse.mealplanid,
          active: true,
          subscribedOn: ((new Date().getMonth() + 1).toString()) + '/' + (new Date().getDate().toString()) + '/' + (new Date().getFullYear().toString())
        });
        console.log(transid + ' : ' + req.users.username + 'updating user plan ' + JSON.stringify(plans));
        let userupdateresponse = await updateUserPlans(plans, req.users, transid);
        console.log('meal plan updation reponse', userupdateresponse);
        if (userupdateresponse.status == "success")
          return res.json({ "status": "success", "msg": "Activated the meal plan " + transid });
        else
          return res.json({ "status": "failure", "msg": "Could not activate meal plan error while updating " + transid });
      }
      catch (err) {
        console.log(transid + 'meal plan activation error ', err);
        return res.json({ "status": "failure", "msg": "Could not activate meal plan error while updating " + transid });
      }
    }
    else {
      return res.json({ "status": "failure", "msg": "Could not find meal plan " + transid });
    }
  }
  catch (Err) {
    //if not return error
    return res.json({ "status": "failure", "msg": "Could not process request " + transid });
  }
});
async function updateUserPlans(plans, user, transid) {
  //change current active

  var params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Key: { 'username': user.username, "usertype": user.usertype },
    UpdateExpression: 'set #a = :x',
    ExpressionAttributeNames: { '#a': 'plans' },
    ExpressionAttributeValues: {
      ':x': plans
    }
  };
  try {
    console.log(transid + ' user plan update request ' + JSON.stringify(params));
    user = await usercode.updateUser(params);
    if (user.status == "success") {
      return { status: "success", msg: "Sent Request " + transid };
    }
    else {

      return { status: "failure", msg: "Could not process request " + transid };
    }
  }
  catch (err) {
    console.log(transid + ' user plan update request error ', err);
    return { status: "failure", msg: "Could not process request " + transid };
  }
}
app.post(path + '/dietitianreq', async function (req, res) {
  if (req.users.usertype === "dietitian") {
    return res.json({ status: "success", msg: "Already Dietitian" });
  }
  let user =await usercode.fetchUser(process.env.STORAGE_USERS_NAME, req.users.username);
  if (user.hasOwnProperty('dietitianreq') && user.dietitianreq) {
    return res.json({ status: "success", msg: "Already Requested for upgrade to Dietitian" });
  }
  console.log('dietitian user request ',user);
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
    if (user.status=="success") {
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
app.post(path + '/approvedietitian', async function (req, res) {
  let input = req.body;
  let isdietitian = false;
  console.log('approval request  ', input);
  if (input.approve == "approve") {
    //approve request;
    isdietitian = true;
  }
  let params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Key: { 'username': input.username, "usertype": "user" },
    UpdateExpression: 'set #a = :x , #b = :y',
    ExpressionAttributeNames: { '#a': 'dietitianreq', '#b': 'isdietitian' },
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
