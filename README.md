# Moodify API!

 Moodify API manages the backend of Moodify, an app created by me! You can view the live deployment here: https://moodify-client.vercel.app/
 
 Moodify tracks your mood, hours slept, as well as other odds and ends of information that you choose to add.
 Moodify utilizes react-chart-js-2 to build a comprehensive chart of your moods from the information you add.
 
 ## API Endpoints
 
 POST /api/users endpoint
 ==
  POST's to this endpoint with the approriate values will register a user within the moodify-users table in the PostgreSQL Database
  
POST /api/auth/login
==
 POSTs to the /auth/login endpoint need to contain a username and password associated with a previously-registered user. Appropriately submitted credentials will return an auth-token.
 
GET /api/moods/
== 
 Fetching from the /api/moods/ endpoint returns the moods created by the logged-in user.
 
POST /api/moods/
==
  POST requests made to this endpoint must contain the user's current mood, a note, a category ID, and hours slept. 
 

## The backend tech stack

 Moodify-API is an Express server using knex to make queries to a PostgreSQL database.
 
 The server utilizes the Express router library to easily organize the server into a logical and RESTful state.
 In addition to Express, I used Mocha and Chai for testing Express CRUD-functions and endpoints.
 
 The stack for the backend:

* Express.js
* Knex
* Node.js
* PostgreSQL
* SQL
* DBeaver
* Mocha
* Chai
 
## User Authentication
  To incorporate user-registration and login functionality, I implemented the bcryptjs and jsonwebtoken libraries.
  
## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`
