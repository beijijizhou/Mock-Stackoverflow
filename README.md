**Mock Stackoverflow**

This project is a Q&A platform that allows users to ask questions, provide answers, and vote on the content. The system enforces rules to prevent abuse and ensure fair participation. Below are the details on how to set up, run, and understand the key features of this application.

**Libraries Used**

bcrypt: For hashing passwords.
cookie-parser: To parse cookies attached to the client request object.
express: A minimal and flexible Node.js web application framework.
cors: To enable Cross-Origin Resource Sharing.
express-session: For handling sessions.
mongoose: For MongoDB object modeling.

**How to Run the Application**

Backend (Server) Setup:

Navigate to the server directory:
cd server
Start the server using nodemon:
nodemon server.js

Frontend (Client) Setup:
Navigate to the client directory:
cd client
Start the client:
npm start

**Design Style**

Voting Restrictions:

Users cannot vote for their own questions and answers to avoid reputation spamming.
Users can vote for other users' answers and questions.
Question Creation:

Users can create questions without tags as new users might not have enough reputation.
User Authentication:

Users must sign up before logging into the service.
Upon the first login, no questions will be presented to the user.
Guest Restrictions:

Guest users cannot ask or answer questions.
Voting System:

Users cannot spam the voting system; they can upvote once and downvote once per item.
Users can undo their vote, which will adjust the reputation accordingly.
Reputation Updates:

When the reputation is changed manually, users should click the "question", "tag", or "userprofile" buttons to get updated reputation.
Pagination Buttons:

Prev Button: When displaying the most recent items, the "prev" button is shown but its functionality is disabled.
Next Button: When displaying the least recent items, the "next" button will disappear.
Error Handling:

Users can refresh the page to reload in case of a system error.
Design Pattern
Singleton Pattern:
A singleton pattern is used for the logger class to ensure there is only one instance of the logger throughout the application.


**Additional Notes**
Make sure to have nodemon installed globally to start the server smoothly.
Ensure that the backend and frontend dependencies are installed via npm install in their respective directories.
This project follows a clean and structured approach to handle a Q&A system, ensuring fair use and a good user experience.
