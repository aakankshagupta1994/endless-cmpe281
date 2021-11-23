var aws = require('aws-sdk');
let docClient=new aws.DynamoDB.DocumentClient();
let dynamoDB=new aws.DynamoDB({apiVersion: '2012-08-10'});
async function getItem(params){
    try {
        
      const data = await docClient.query(params).promise();
      return data.Items[0];
    } catch (err) {
      return err
    }
}
async function addUser(params){
   try{
       
        let data= await docClient.put(params).promise();
        console.log(data);
        return {status:"success",data:data};
   }
   catch(err)
   {
       console.log('adding user error',err);
       return {status:'failure',err:err};
   }
}
async function fetchUser(usertable,username){
    console.log("Fetching User ",usertable,username);
    var params = {
        TableName: usertable,
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames: {
              "#username": "username"
          },
          ExpressionAttributeValues: {
              ":username": username
          },
          Limit:1
    }
    console.log(params);
    // Call DynamoDB to read the item from the table
    try{
     let user=await getItem(params);
      console.log("Success", user);
      return user;
    }   
    catch(Err){
    
        console.log("Error", Err);
        return null;
    }
}
module.exports={
    fetchUser,
    addUser
}
