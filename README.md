# Moodify API!

 Moodify API manages the backend of Moodify, an app created by me! You can view the live deployment here: https://moodify-client.vercel.app/
 
 Moodify tracks your mood, hours slept, as well as other odds and ends of information that you choose to add.
 Moodify utilizes react-chart-js-2 to build a comprehensive chart of your moods from the information you add.
 

## The backend tech stack

 Moodify-API is an Express server using knex to make queries to a PostgreSQL database.
 
 The server utilizes the Express router library to easily organize the server into a logical and RESTful state.
 In addition to Express, I used Mocha and Chai for testing Express CRUD-functions and endpoints. 

## User Authentication
  To incorporate user-registration and login functionality, I implemented the bcryptjs and jsonwebtoken libraries.
  
## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`
