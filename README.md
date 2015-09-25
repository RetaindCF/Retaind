[![Build Status](https://travis-ci.org/RetaindCF/Retaind.svg?branch=master)](https://travis-ci.org/RetaindCF/Retaind)

#Retaind

####A Memory Retention Program
------------------------------------------
What are your plans, what are your dreams, what are your aspirations, and why do you keep forgetting about them? Retaind is a revolutionary new web app that allows you to write down your plans and be reminded of them via email a day, a week, or a month later. Remember when you spent three hours googling cooking classes and then never followed up on it? No? Well Remindr does!

+ This is app allows you to set reminders to keep track of all your delusions of self-improvement.
+ Plus, you can find our app on [Heroku](http://heroku.com/) at [Retaind](https://dev-remindr.herokuapp.com/).

------------------------------------------

###How Does Our App Work? -JavaScript Functionality
+ Users start by signing up for the app at the login screen with their email address, where we use http basic to create a token, using encryption (bcrypt with eat).
+ Once logged in, users can select the goal or idea they want to be reminded of and when they want to get an email notificaiton.
+ lib directory includes our auth logic js files, time js files and handling error js file.
+ models directory is where our user schema for MongoDB is located.
+ public directory includes our front-end facing HTML, CSS and js for client or user interaction, including our dashboard.
+ routes directory contains our REST API / CRUD routes to ensure the best possible experience for our app users.
+ server.js represents our REST API server.
+ The ```mocha``` command runs our local Mocha / Chai tests in the test directory.

------------------------------------------

###External Resources
We are using the following external resources, as shown in our package.JSON:
+ [BCrypt for Node](https://www.npmjs.com/package/bcrypt-nodejs)
+ [Body Parser](https://www.npmjs.com/package/body-parser)
+ [EAT - Encrypted Authenticated Tokens](https://www.npmjs.com/package/body-parser) by [ToastyNerd](https://www.npmjs.com/~toastynerd)
+ [Express.js](http://expressjs.com/) by StrongLoop
+ [Mailgun.js](https://www.npmjs.com/package/mailgun-js) by OneLobby
+ [MongoDB](https://www.mongodb.org/)
+ [Mongoose.js](http://mongoosejs.com/) by LearnBoost
+ [Node.js](https://nodejs.org/en/) by Joyent

-------------------------------------------

###Contributors

+ [D Earl Duncan](https://github.com/DDunc)
+ [Erik Luetkehans](https://github.com/Eluetkehans)
+ [David Sheffield](https://github.com/dsheffield206)

