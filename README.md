[![Build Status](https://travis-ci.org/RetaindCF/Retaind.svg?branch=master)](https://travis-ci.org/RetaindCF/Retaind)

#Retaind

####A Memory Retention Program
------------------------------------------
Have you ever fotten something important? Welcome to the human race. To err is core to what it means to be human. Using our app Retaind will help you escape the [Forrgetting Curve](http://www.learningsolutionsmag.com/articles/1400/brain-science-overcoming-the-forgetting-curve), and be reminded of what's important to you.

+ This is app allows you to set reminders for different use cases to help you keep track and be reminded of important due dates and connections.
+ Plus, you can find our app on [Heroku](http://heroku.com/) at [Retaind](https://dev-remindr.herokuapp.com/).

------------------------------------------

###How Does Your App Work? -JavaScript Functionality
+ Users start by signing up for the app at the login screen, where we use http basic to create a token, using encryption (bcrypt with eat).
+ Once logged in, users can select the use case for which they want to be reminded. Our initial logic was built for someone with an ambition to learn something new or maintain a long-distance relationship.
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

