/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	FUNCTION_USERSERVICE_NAME
	STORAGE_USERS_NAME
	STORAGE_USERS_ARN
	STORAGE_USERS_STREAMARN
	userlayer
Amplify Params - DO NOT EDIT */
const aws = require('aws-sdk');
let dynamoDB=new aws.DynamoDB({apiVersion: '2012-08-10'});
exports.handler = async (event) => {
   
    // Send post authentication data to Cloudwatch logs
    console.log ("Authentication successful");

    console.log("complete Event",event);
    console.log("STORAGE_USERS_NAME: ",STORAGE_USERS_NAME);
   /* var params = {
        TableName: STORAGE_USERS_NAME,
        Item: {
        "username": {
                "S": event.userName
            },
            "firstname": {
                "S": event.request.userAttributes.given_name
            },
            "isActive": {
                "BOOL": event.request.userAttributes['cognito:user_status']==='CONFIRMED'?true:false
             },
            "lastname": {
                "S": event.request.userAttributes.family_name
            },"email": {
                "S": event.request.userAttributes.email
            },
            "Role": {
                "S": "user"
            }
        }
    };

    // Call DynamoDB to add the item to the table
    dynamoDB.putItem(params, function(err, data) {
    if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
        }
    });*/
    // Return to Amazon Cognito
    callback(null, event);
};
