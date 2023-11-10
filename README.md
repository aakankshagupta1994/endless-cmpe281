
# CMPE-281 - CLOUD TECHNOLOGIES 


PROFESSOR - SANJAY GARJE


SUBMITTED BY : 


Aakanksha Gupta (Team leader) 
https://www.linkedin.com/in/eraakankshagupta/


Varun Alla 
https://www.linkedin.com/in/varunalla/


Abhishek Yadav
https://www.linkedin.com/in/abhishek-yadav-ay/


Pratiksha Shukla 
https://www.linkedin.com/in/pratiksha-shukla-61b17919a/


Govinder Somal
https://www.linkedin.com/in/govindersomal/ 

SAN JOSE STATE UNIVERSITY 

COMPUTER ENGINEERING DEPARTMENT

ELIFEDIET
-----
URL: elifediet.com
------

In today's busy world, using this smart app can help us maintaining good food habits. 

USE CASES: 
![image](https://user-images.githubusercontent.com/89236239/143188321-603e71fb-fcaf-43f4-860f-c25911920336.png)

ARCHITECTURE DIAGRAM
------

![image](https://user-images.githubusercontent.com/89236239/143187839-c21d7f94-96f1-4398-a68c-ba00caa92106.png)

TECHNOLOGIES/PLATFORMS:
------
AWS SERVICES: AWS COGNITO, AWS AMPLIFY, AWS LEX, AWS POLLY, AWS SES, AWS ROUTE 53. 


FRONTEND: ANGULAR


BACKEND: AWS AMPLIFY REST API TEMPLATE WITH PRODUCT SEPCIFIC CHANGES. 


SOCIAL INTEGRATIONS: FACEBOOK


DEPLOYMENT: AWS AMPLIFY GENERATED CLOUDFORMATION TEMPLATE. 


PREFERRED SOFTWARE: VISUAL STUDIO CODE 

ROLES:
----
![image](https://user-images.githubusercontent.com/89236239/143188591-5f28ac64-96af-4b33-aa23-197b0e7056f4.png)

BASIC SETUP STEPS: 
-----

```
npm install
npm i -g @aws-amplify/cli
amplify init
npm start
```


Module Screenshots:
----

# Home Page Component(Landing Page) : User View 
On the home page, user will see either his today's meal plan details or if he/she is not subscribed to a plan then a button directing to start the journey 

![image](https://user-images.githubusercontent.com/89236239/143189021-8e77e00c-f5ea-4a31-aa20-af5f8eab09d8.png)
![image](https://user-images.githubusercontent.com/89236239/143322518-cc2c0c15-80a8-4154-9971-932dbbdac0df.png)

 
# ChatBot : User View
The chatbot developed using AWS LEX helping user in suggesting right meal plan.
The chatbot is available across the application. 
The chatbot leverages the amazon lex services to provide interactive conversation for the logged-in user.   


![image](https://user-images.githubusercontent.com/89236239/143189039-48505e85-39b2-412b-b86b-e136f0bfdfc5.png)
![image](https://user-images.githubusercontent.com/89236239/143189064-33d1e1b9-8c3e-4cb6-ae5d-ee9c30045a0d.png)
![image](https://user-images.githubusercontent.com/89236239/143189074-fcc6d24f-6194-422b-ab61-bb0902a00a07.png)






# Subscribed Meal Plan: User/Dietician/Admin Role

The page will display all the available diet plans .
User can subscribe to diet plan by clicking the subscribe button .
Details button will take user to the details page of that meal plan.
 ![image](https://user-images.githubusercontent.com/89236239/143189095-28f276aa-a8ab-4b13-8099-2bd0a60991b1.png)
 ![image](https://user-images.githubusercontent.com/89236239/143189110-afc53e28-bebc-44b7-857e-f80b72eb6aa7.png)

 




# Subscribed meal plans (details) button : User/Dietician/Admin Role

The sample meal plan page displays different recipes based upon the dietary options available
 i.e. Vegan, vegetarian, etc.
Users can browse through the sample list to check the week-long recipes .
![image](https://user-images.githubusercontent.com/89236239/143189131-ec420e68-213d-4350-be64-9579f61d8951.png)


User can check the recipe details of all seven days .


![image](https://user-images.githubusercontent.com/89236239/143189146-97527139-178b-4799-8d77-64e1f4bb2041.png)





# Available Recipes: User/Dietician/Admin Role

The users will be able to access this available page and they are given the recipe name and the type 
whether it’s veg/non-veg meals. 
![image](https://user-images.githubusercontent.com/89236239/143189164-9f8abac6-445c-41f1-b8d9-f3e7c4774df9.png)

![image](https://user-images.githubusercontent.com/89236413/143194374-ff3d91ce-4393-468c-8198-1118036484ed.png)

  

# User Profile: User/Dietician/Admin Role
We are able to see our user name displayed in the top right drop down menu.
![image](https://user-images.githubusercontent.com/89236239/143189248-8b5d516c-4910-40e5-8fc5-656d0782c800.png)






# Create Recipe Page: Dietitian/Admin View
The dietitians will be able to create recipes on this page. 
A dietitian will need to enter the recipe name,
select the type of recipe (Veg/Non-Veg), enter ingredient details, and the procedure to make the dish.  
The recipes created here can then be used in the meal plans that the dietitian will create
![image](https://user-images.githubusercontent.com/89236413/143194520-957a5354-b2e4-4ada-8295-71fb5409f0d8.png)

 ![image](https://user-images.githubusercontent.com/89236413/143194641-188cb833-f97f-4955-8e7d-548aeb207173.png)
![image](https://user-images.githubusercontent.com/89236413/143194820-a42daec8-dc7b-4f9a-a190-f48895d7cfb9.png)







# Create Meal Plan : Dietician/Admin Role
The dietitians will be able to create meal plan on this page.
Dietitian will add the details of meal plan like type ,recipes etc.
 ![image](https://user-images.githubusercontent.com/89236239/143189292-a1b73198-2d45-4a7a-afe9-c40d54d228e2.png)

 ![image](https://user-images.githubusercontent.com/89236239/143189313-75da45a6-78bb-488b-853b-3ec4bb2e3c16.png)

# Email Service: User/Dietician/Admin Role (optional)
Recipe email to subscribed user with an active plan
 ![image](https://user-images.githubusercontent.com/89236239/143189324-d7233ea7-1d01-41fb-bd28-c951ae2e03d4.png)
![image](https://user-images.githubusercontent.com/89236239/143189333-b69a04d4-0b2d-4545-8210-8d5ae47d3d09.png)



 
# Admin View 
Admin has the authority to approve the dietitian request. 
 
![image](https://user-images.githubusercontent.com/89236239/143189360-5de9e67a-9ef1-4418-80c5-e071018e450b.png)
![image](https://user-images.githubusercontent.com/89236239/143189370-fc562efe-0f87-4283-9b41-6a5ca71a7696.png)

# Documentation and Video Link: 

https://drive.google.com/drive/folders/1u52QaIU3EETsuap6bIJdWIGtKY-NKfcj?usp=sharing

