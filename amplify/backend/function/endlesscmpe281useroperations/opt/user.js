var aws = require('aws-sdk');
let docClient = new aws.DynamoDB.DocumentClient();
let dynamoDB = new aws.DynamoDB({ apiVersion: '2012-08-10' });


let cognitoClient;
function assignClient(region) {
    cognitoClient = new aws.CognitoIdentityServiceProvider({ region: region });
}
async function getItem(params) {
    try {

        const data = await docClient.query(params).promise();
        return data.Items[0];
    } catch (err) {
        return err
    }
}
let scanItems=async(params)=>{
    try {
        
    let scanResults = [];
    let items;
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
  } catch (err) {
    return err
  }
} 
async function getItems(params) {
    try {

        const data = await docClient.query(params).promise();
        return data.Items[0];
    } catch (err) {
        return err
    }
}
async function addUser(params) {
    try {

        let data = await docClient.put(params).promise();
        console.log(data);
        return { status: "success", data: data };
    }
    catch (err) {
        console.log('adding user error', err);
        return { status: 'failure', err: err };
    }
}
async function updateUser(params) {
    try {

        let data = await docClient.update(params).promise();
        console.log( 'updated user ',data);
        return { status: "success", data: data };
    }
    catch (err) {
        console.log( 'updating user error', err);
        return { status: 'failure', err: err };
    }
}
function getEmailFromCognitoDetails(cognitoUserObj) {
    let email = "";
    for (let userAtt of cognitoUserObj.Attributes) {
        if (userAtt.Name === "email")
            email = userAtt.Value;
    }
    return email;
}
async function fetchUser(usertable, username) {
    console.log("Fetching User ", usertable, username);
    var params = {
        TableName: usertable,
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames: {
            "#username": "username"
        },
        ExpressionAttributeValues: {
            ":username": username
        },
        Limit: 1
    }
    console.log(params);
    // Call DynamoDB to read the item from the table
    try {
        let user = await getItem(params);
        console.log("Success", user);
        return user;
    }
    catch (Err) {

        console.log("Error", Err);
        return null;
    }
}
async function fetchDietitianReqs(usertable) {
    console.log("Fetching Users with dietitian request true ", usertable);
    let params = {
        TableName: usertable,
        FilterExpression: "#a = :val",
        ExpressionAttributeNames: { "#a": "dietitianreq"
        },
        ExpressionAttributeValues: {
            ":val": true
        },
        ProjectionExpression:"username"
    }
    console.log(params);
    // Call DynamoDB to read the item from the table
    try {
        let users = await scanItems(params);
        console.log("Success", users);
        return users;
    }
    catch (Err) {

        console.log("Error", Err);
        return null;
    }
}
function fetchUserPoolDetails(request) {
    const authProvider = request.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider;
    console.log(authProvider);
    const parts = authProvider.split(':');
    console.log(parts);
    const userPoolIdParts = parts[parts.length - 3].split('/');
    console.log(userPoolIdParts);
    const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
    console.log(userPoolId);
    const userPoolUserId = parts[parts.length - 1];
    console.log(userPoolUserId);
    return { userPoolId, userPoolUserId };
}
async function getUserOfAuthenticatedUser(request) {
    // Get the unique ID given by cognito for this user, it is passed to lambda as part of a large string in event.requestContext.identity.cognitoAuthenticationProvider
    let result = fetchUserPoolDetails(request);
    console.log('user pool details : ', result);
    let req = {
        UserPoolId: result.userPoolId,
        Filter: `sub = "${result.userPoolUserId}"`,
        Limit: 1
    }
    console.log(req);
    let response = await cognitoClient.listUsers(req).promise();
    console.log(response.Users);
    console.log("got user:", response.Users[0])
    return response.Users[0];
}
async function userMiddleWare(req, res, next) {
    console.log('request ', req.apiGateway.event.requestContext);
    try {
        let cuser = await getUserOfAuthenticatedUser(req);
        let email = getEmailFromCognitoDetails(cuser);
        let user = await fetchUser(process.env.STORAGE_USERS_NAME, email);
        req.users = user;
        next();
    }
    catch (Err) {
        console.log(Err);
        res.status(503).json({ 'Status': 'Err' });
    }
}
async function fetchMealPlan(mealplantable, mealplanid) {
    console.log("Fetching User ", mealplantable, mealplanid);
    var params = {
        TableName: mealplantable,
        KeyConditionExpression: "#a = :b",
        ExpressionAttributeNames: {
            "#a": "mealplanid"
        },
        ExpressionAttributeValues: {
            ":b": mealplanid
        },
        Limit: 1
    }
    console.log(params);
    // Call DynamoDB to read the item from the table
    try {
        let mealplan = await getItem(params);
        console.log("Success mealplan", mealplan);
        return mealplan;
    }
    catch (Err) {

        console.log("Error", Err);
        return null;
    }
}
module.exports = {
    fetchUser,
    addUser,
    fetchUserPoolDetails,
    getUserOfAuthenticatedUser,
    assignClient,
    getEmailFromCognitoDetails,
    userMiddleWare,
    updateUser,
    fetchDietitianReqs,
    fetchMealPlan
}
