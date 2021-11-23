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



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
const _util=require('underscore');

AWS.config.update({ region: process.env.TABLE_REGION });
const usercode=require('/opt/user');
usercode.assignClient(process.env.TABLE_REGION);
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "users";
if(process.env.ENV && process.env.ENV !== "NONE") {
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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});
app.use(usercode.userMiddleWare);
// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

app.get(path,async function(req,res){

  console.log('usercontext ',req.users);
  let response=req.users;
  response.identityid="";
  return res.json(response);
});
app.get('/myplans',async function(req,res){
  console.log('usercontext ',req.users);
  return res.json({activeplan:req.users.activeplan,plans:req.users.plans});
});
app.post('/subscribe',async function(req,res){
  let input=req.body;
  //check plan exists in user object?
  if(req.users.activeplan&&req.users.activeplan.planid==input.mealplanId){
    return res.json({"status":"Already Subscribed and Active"});
  }
  if(req.users.plans){
   let mealplan= _util.find(req.users.plans,function(plan){return plan.mealid==input.mealplanId});
   if(mealplan){
     //change current active
     return res.json({"status":"Activated the meal plan"});
   }
  }
  //if yes make it active
  //else
  //check plan exists

  //if yes add it to user object and update
  //else reject

  console.log('usercontext ',req.users);
  return res.json({activeplan:req.users.activeplan,plans:req.users.plans});
});
app.post('/dietitianreq',function(req,res){
  if(req.users.usertype==="dietitian"){
      return res.json({status:"success",msg:"Already Dietitian"});
  }
  let user=usercode.fetchUser(process.env.STORAGE_USERS_NAME,req.user.username);
  if(user.hasOwnProperty('dietitianreq')&&user.dietitianreq){
    return res.json({status:"success",msg:"Already Requested for upgrade toDietitian"});
  }
  //update user
});
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
