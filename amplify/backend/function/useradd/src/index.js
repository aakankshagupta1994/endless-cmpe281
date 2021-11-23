/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	FUNCTION_USERSERVICE_NAME
	STORAGE_USERS_NAME
	STORAGE_USERS_ARN
	STORAGE_USERS_STREAMARN
	userlayer
Amplify Params - DO NOT EDIT */
const usercode=require('/opt/user');
const aws = require('aws-sdk');
let dynamoDB=new aws.DynamoDB({apiVersion: '2012-08-10'});
exports.handler = async (event, context, callback) => {
   
    // Send post authentication data to Cloudwatch logs

    console.log("User Confirmation Event",event);
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
    try{
        console.log('creating user ',params);
        let data=await usercode.addUser(params);
    }
    catch(Err){
        console.log('Error in user lambda',Err);
    }
    // Return to Amazon Cognito
    callback(null, event);
};
