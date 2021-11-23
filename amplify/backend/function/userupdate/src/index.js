/* Amplify Params - DO NOT EDIT
    ENV
    FUNCTION_USERSERVICE_NAME
    REGION
    STORAGE_USERS_ARN
    STORAGE_USERS_NAME
    STORAGE_USERS_STREAMARN
Amplify Params - DO NOT EDIT */
const usercode = require('/opt/user');
const aws = require('aws-sdk');
let dynamoDB = new aws.DynamoDB({ apiVersion: '2012-08-10' });
exports.handler = async (event, context, callback) => {

    // Send post authentication data to Cloudwatch logs
    let user = await usercode.fetchUser(process.env.STORAGE_USERS_NAME, event.request.userAttributes.email);
    console.log(user);
    if (!user) {
        console.log('user not present, so creating the user');
        let params = {
            TableName: process.env.STORAGE_USERS_NAME,
            Item: {
                "username": 
                    event.request.userAttributes.email
                ,
                "firstname": ""
                ,
                "isActive":  event.request.userAttributes['cognito:user_status'] === 'CONFIRMED' ? true : false
                ,
                "lastname":  ""
                , "email":  event.request.userAttributes.email
                ,
                "phone": event.request.userAttributes.phone_number
            
                ,
                "identityid": event.userName
                ,
                "usertype":  "user",
                "dietitianreq":false,
                "isdietitian":false,
                "activeplan" : null,
                "plans":[]
                
            }
        };
        let data=await usercode.addUser(params);
        console.log(data);
        callback(null, event);
    }
    // Call DynamoDB to add the item to the table
    else
        // Return to Amazon Cognito
        callback(null, event);
};

