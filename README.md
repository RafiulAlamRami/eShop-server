Project Setup for eShop
1. Project Initialization
Create a new directory for the project:
mkdir eShop
cd eShop
Initialize a Node.js project:
npm init -y
2. Install Dependencies
Express.js: A minimal and flexible Node.js web application framework.
Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
Dotenv: A module to load environment variables from a .env file into process.env.
Other utilities: Such as body-parser, cors, and nodemon for development.
npm install express mongoose dotenv body-parser cors
npm install --save-dev nodemon


Clone the repository:
git clone <your-repo-url>
cd eShop
Install the dependencies:
npm install
Create a .env file:
Add your MongoDB URI and PORT in the .env file.

Run the server:
npx nodemon server.js

