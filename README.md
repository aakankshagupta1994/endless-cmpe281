# EndlessCmpe281

ELIFEDIET
-----
URL: elifediet.com
------
USE CASES: 
![image](https://user-images.githubusercontent.com/89236239/143188321-603e71fb-fcaf-43f4-860f-c25911920336.png)

ARCHITECTURE DIAGRAM
------

![image](https://user-images.githubusercontent.com/89236239/143187839-c21d7f94-96f1-4398-a68c-ba00caa92106.png)

ROLES:
----
![image](https://user-images.githubusercontent.com/89236239/143188591-5f28ac64-96af-4b33-aa23-197b0e7056f4.png)

BASIC SETUP STEPS: 
-----

```
npm install
npm i -g @aws-amplify/cli
amplify env checkout devmain
```


Module Screenshots:

Home Page Component : User View
On the home page, the user will see the start your journey.
The details of recipes for the day will be displayed on the home page.
On the navbar, user will get the option to navigate to a different service page. 
The chatbot service will be there to help the user.
![image](https://user-images.githubusercontent.com/89236239/143189021-8e77e00c-f5ea-4a31-aa20-af5f8eab09d8.png)

 
ChatBot : User View
The chatbot is available across the application. 
The chatbot leverages the amazon lex services to provide interactive conversation for the logged-in user.   
 


![image](https://user-images.githubusercontent.com/89236239/143189039-48505e85-39b2-412b-b86b-e136f0bfdfc5.png)
![image](https://user-images.githubusercontent.com/89236239/143189064-33d1e1b9-8c3e-4cb6-ae5d-ee9c30045a0d.png)
![image](https://user-images.githubusercontent.com/89236239/143189074-fcc6d24f-6194-422b-ab61-bb0902a00a07.png)






Subscribed Meal Plan page 1 : User/Dietician/Admin Role
The page will display all the available diet plans .
User can subscribe to diet plan by clicking the subscribe button .
Details button will take user to the details page of that meal plan.
 ![image](https://user-images.githubusercontent.com/89236239/143189095-28f276aa-a8ab-4b13-8099-2bd0a60991b1.png)





Subscribed Meal Plan page 2: User/Dietician/Admin Role
 ![image](https://user-images.githubusercontent.com/89236239/143189110-afc53e28-bebc-44b7-857e-f80b72eb6aa7.png)

 




Subscribed meal plans (details) button : User/Dietician/Admin Role
The sample meal plan page displays different recipes based upon the dietary options available
 i.e. Vegan, vegetarian, etc.
Users can browse through the sample list to check the week-long recipes .
![image](https://user-images.githubusercontent.com/89236239/143189131-ec420e68-213d-4350-be64-9579f61d8951.png)

 
Subscribed meal plan page 2: User/Dietician/Admin Role
User can check the recipe details of all seven days .
 


![image](https://user-images.githubusercontent.com/89236239/143189146-97527139-178b-4799-8d77-64e1f4bb2041.png)





Available Recipes: User/Dietician/Admin Role
The users will be able to access this available page and they are given the recipe name and the type 
whether it’s veg/non-veg meals. 


Available Recipes page 2 type and ingredients : User/Dietician/Admin Role


![image](https://user-images.githubusercontent.com/89236239/143189164-9f8abac6-445c-41f1-b8d9-f3e7c4774df9.png)

 



Available Recipes Page 3 procedures: User/Dietician/Admin Role
 

  
![image](https://user-images.githubusercontent.com/89236239/143189208-cf88489e-2c45-4af3-99a7-9b85de8f5a38.png)

User Profile: User/Dietician/Admin Role
We are able to see our user name displayed in the top right drop down menu.


![image](https://user-images.githubusercontent.com/89236239/143189248-8b5d516c-4910-40e5-8fc5-656d0782c800.png)






Create Recipe Page: Dietitian/Admin View
The dietitians will be able to create recipes on this page. 
A dietitian will need to enter the recipe name,
select the type of recipe (Veg/Non-Veg), enter ingredient details, and the procedure to make the dish.  
The recipes created here can then be used in the meal plans that the dietitian will create
![image](https://user-images.githubusercontent.com/89236239/143189265-559a0832-2ece-4d4e-9610-bdcc1b980888.png)

 
Create Recipe Page 2: User/Dietician/Admin Role
 ![image](https://user-images.githubusercontent.com/89236239/143189271-ef4d8b5c-a683-4819-8ad0-8da05f119a0d.png)



![image](https://user-images.githubusercontent.com/89236239/143189183-dcb6c9ff-b0d4-4c40-9e33-ff3824974ef3.png)






Create Meal Plan : User/Dietician/Admin Role
The dietitians will be able to create meal plan on this page.
Dietitian will add the details of meal plan like type ,recipes etc.
 ![image](https://user-images.githubusercontent.com/89236239/143189292-a1b73198-2d45-4a7a-afe9-c40d54d228e2.png)

Create Meal Plan Page 2: User/Dietician/Admin Role
 ![image](https://user-images.githubusercontent.com/89236239/143189313-75da45a6-78bb-488b-853b-3ec4bb2e3c16.png)

Email Service: User/Dietician/Admin Role (optional)
Recipe email to subscribed user with an active plan
 ![image](https://user-images.githubusercontent.com/89236239/143189324-d7233ea7-1d01-41fb-bd28-c951ae2e03d4.png)
![image](https://user-images.githubusercontent.com/89236239/143189333-b69a04d4-0b2d-4545-8210-8d5ae47d3d09.png)



 
Admin View 
Admin has the authority to approve the dietitian request. 
 
![image](https://user-images.githubusercontent.com/89236239/143189360-5de9e67a-9ef1-4418-80c5-e071018e450b.png)
![image](https://user-images.githubusercontent.com/89236239/143189370-fc562efe-0f87-4283-9b41-6a5ca71a7696.png)


