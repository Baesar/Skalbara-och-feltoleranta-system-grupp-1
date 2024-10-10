# Grupp 2 - GetBetter
![en snäll katt](https://github.com/user-attachments/assets/033459e3-9ca0-4a9f-8568-793c6bce079c)



- [Participants](#participants)
- [Preparations](#preparations)
- [Run the application](#run-the-application)
- [The Application](#the-application)

# Participants:<br>
Ahmed Hussein<br>
Julius Norén<br>
Darina Larsen<br>
Rama Muharam

# Preparations:
Firstly, you need to download the project. Then, inside the 'backend' directory, you need to create a file called ".env".  
Fill the file with this code:
```
PORT=5000
ATLAS_URI=mongodb+srv://huah21vn:hr7896DWnuQhKEL@web-grupp-2-db.bhfmb.mongodb.net/?retryWrites=true&w=majority&appName=Web-grupp-2-db
SECRET=baesargreaterthanashbenlolo
EMAIL_ADDRESS=information.getbetter@gmail.com
EMAIL_PASSWORD=ytkfipciftkduijx
```
![.env file](https://github.com/user-attachments/assets/b82bffdb-5c91-4921-be11-3a54cd49bfa6)


# Run the application:
In order to start the application you can either [use the .bat files](#using-the-bat-files) or [start it manually](#manual-start).

## Using the .bat files
1. Open the install.bat file. This will install all of the dependencies for both the frontend and the backend.
2. Open the run.bat file. This will start the backend server and the frontend application.

## Manual start
1. Open two command prompt terminals, one for the backend direcetory and one for the frontend directory.
2. Run `npm install` in both the backend and the frontend.

3. Inside the backend directory, run `npm run dev`, this will start the backend server. It should look like this and say "server started on port 5000".
![Backend server started](https://github.com/user-attachments/assets/b057c2a3-fb2a-4e41-9bce-f7e89fa3475f)

4. Inside the frontend directory, run `npm start`, this will start the application. At first, it will display some errors, but after a short while it should look like this:
![Frontend application started](https://github.com/user-attachments/assets/e9a917a4-5ffa-4907-90e3-6bd549fe1a3b)

5. Book your therapy <3

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
In the *Admin Page*, you have two interfaces. The first one is where you can create new users. The second interface is found by clicking on the *List of Users* link. ![List of Users](https://github.com/user-attachments/assets/f8ed5c97-d1f1-492e-b3b4-7d3f0077bd4b)
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
