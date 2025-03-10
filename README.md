# Grupp 2 - GetBetter
![en snäll katt](https://github.com/user-attachments/assets/033459e3-9ca0-4a9f-8568-793c6bce079c)



- [Participants](#participants)
- [Setup](#setup)
- [Run the application](#run-the-application)
- [The Application](#the-application)

# Participants:<br>
Ahmed Hussein<br>
Julius Norén<br>
Rama Muharam

# Setup:
## *.env* files
Inside the 'backend' directory, you need to create a *.env* file inside these three folders:
```
##api-gateway
PORT=80
SECRET=baesargreaterthanashbenlolo
```
```
##user-service
PORT=80 USER_ATLAS_URI=mongodb+srv://juliusnoren:7BlVXBj7RtvuGtRS@cluster0.njn74.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0 SECRET=baesargreaterthanashbenlolo EMAIL_ADDRESS=information.getbetter@gmail.com EMAIL_PASSWORD=ytkfipciftkduijx
```
```
##booking-service
PORT=80 BOOKING_ATLAS_URI=mongodb+srv://juliusnoren:7BlVXBj7RtvuGtRS@cluster0.njn74.mongodb.net/Booking?retryWrites=true&w=majority&appName=Cluster0
```
![.env files](https://cdn.discordapp.com/attachments/1221090555405008978/1344687263065571501/image.png?ex=67cfa8da&is=67ce575a&hm=65c03dd4489c8daa29da154193d94850fcb294265d998e89a79e10fadde1e5f0&)

## Install dependencies
Inside the three previous folders and also the 'frontend' directory, run `npm install` to install all of the dependencies

## Login to Azure and Docker
You need to login to Azure, run `az login -o none` 
Also, login to docker, run `docker login getbetter.azurecr.io -u getbetter -p CONTAINER_REGISTRY_PASSWORD`,
replace CONTAINER_REGISTRY_PASSWORD with the Password that appears after running `az acr credential show -n getbetter -o table`

You also need to have Docker Desktop running, so start it.

## Terraform
Inside the 'terraform' directory, run `terraform init`.
Then, run `terraform apply -auto-approve`.

## Connect to AKS
Run
`az aks get-credentials --resource-group YOUR_RESOURCE_GROUP --name YOUR_AKS_CLUSTER`,
replace `YOUR_RESOURCE_GROUP` and `YOUR_AKS_CLUSTER` with `getbetter` or whatever value the "app_name" terraform variable is set to.

# Run the applicaiton:
Now to running the application.

### Build & Start Docker containers
Inside the 'grupp_project' directory, run 
`docker build -t getbetter.azurecr.io/api-gateway:latest ./backend/api-gateway`
`docker build -t getbetter.azurecr.io/user-serivce:latest ./backend/user-service`
`docker build -t getbetter.azurecr.io/booking-service:latest ./backend/booking-service`, 
this will build the Docker images.

Then, run
`docker push getbetter.azurecr.io/api-gateway:latest`
`docker push getbetter.azurecr.io/user-service:latest`
`docker push getbetter.azurecr.io/booking-service:latest`,
this will push the images to Docker.

### Apply to Kubernetes
Run `kubectl apply -f k8s-manifests/`,
this will start the microservices on Kubernetes.

### Start frontend
Now everything is up and running.
All you need to do is run `npm start` inside the 'frontend' directory, this will start the application. At first, it will display some errors, but after a short while it should look like this:  
   ![Frontend application started](https://github.com/user-attachments/assets/e9a917a4-5ffa-4907-90e3-6bd549fe1a3b)

You can now book your therapy <3

# The Application
For unregistered users, only the *Home* page is visible.
To register, you can either sign in to an existing account or create a new account by signing up.  
(Feel free to sign up using a real email address, as you will receive an email verification)
![Sign in/Sign up](https://github.com/user-attachments/assets/7b26346c-ccac-4ea5-aa4e-390228e69aef)

There are three different roles that an account can have:
- **Member**
- **Staff**
- **Admin**  

When creating a new account using the "Sign Up" button, the account will be assigned to the default role of **Member**.

## **Member**
The **Member** is your typical therapy-booker. **Members** can access the *User Page* via the *Make an Appointment* button and the *My Page* through the *My Page* button.

### *User page*
In the *User Page*, you can select the date and time for your therapy sessions. There's also a required *Details* field where you can briefly (or thoroughly, if you prefer) explain the reason for seeking therapy.

### *My Page*
In the *My Page*, you can view the details of your account, like *Name*, *Email* and what *Role* you are assigned as.
Below that, you can view all of your bookings that you've made. You can also delete any bookings you no longer want.

## **Staff**
The **Staff** are the workers at the therapy clinic (specifically those authorized for this role). **Staff** can access the *Staff Page* via the *View Appointments* button and the *My Page* through the *My Page* button.

### *Staff Page*
In the *Staff Page*, you can select a date and view all bookings for that date. For each booking, the *Staff* can see the time of the appointment and the name and email of the user who booked the appointment. They also have the ability to delete bookings (for whatever reason that might be).

### *My Page*
In the *My Page*, you can view the details of your account, like *Name*, *Email* and what *Role* you are assigned as.

## **Admin**
The **Admin** is an account for managing users (both **Members** and **Staff**). **Admin** can access the *Admin Page* via the *Create Users* button and the *My Page* through the *My Page* button.

### *Admin Page*
In the *Admin Page*, you have two interfaces. The first one is where you can create new users. The second interface is found by clicking on the *List of Users* link.   
![List of Users](https://github.com/user-attachments/assets/f8ed5c97-d1f1-492e-b3b4-7d3f0077bd4b)  
Once there, you can view all existing users (except **Admin**). You can also delete users there. When a user is deleted, so is all bookings made by that user. 

### *My Page*
In the *My Page*, you can view the details of your account, like *Name*, *Email* and what *Role* you are assigned as.

## Login credentials
Here are the login credentials for **Staff** and **Admin**:
- Admin:  
  Email: admin@pmail.com  
  Password: admin123
- Staff:  
  Email: staffmcpower@pmail.com  
  Password: staff123
