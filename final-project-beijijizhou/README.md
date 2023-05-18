Database: Mongodb,name:"fake_so"

library: bycrypt,cookie parse, express,cors,express-session,mongoose,

How to run it: My whole application is built on top of HW3 with additional functionalities. Therefore, it is the same way to run it as HW3 does， which is "cd server" and "cd client" to run the front end and back end. "nodemon server.js" will start the server side and "npm start" will start the client side.

Design style:

1.Users can not vote for their own questions and answers to avoid reputation spamming, but they vote for other users answers and question.

2.Users can create questions without tags since new users dont not have enough reputation.

3.In order to log into the service, you have to sign up first. There is will be no question as you first log in. 

4.Guest users can not ask or answer questions.

5.Users can not spam the voting system, and they can upvote once and downvote once based on initial votes. They can also undo their vote, which will undo the reputation.   

6.When the reputation is changged manually, it is better for users to click "question" or "tag", "userprofile" button to get updated reputation.

7."prev" and "next button": when displaying most recent items, "prev" button is showed but its functionality disabled. When displaying least recent items, "next" button will disappear.
8: When users encounter the system error, they can always refresh the page to reload the page. 

Design Pattern: Singleton for logger class.

where used: I used it in the Login, Register, Form component to alert users about according error.

Reason: I only need one logger class to display appropriate error message to the users when input data is invalid. Therefore, I don't have to create new logger class everywhere. One logger class is sufficient. 
