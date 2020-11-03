Short reminder of my actions:
(consider backend)

## npm init - backend initialized with server.js as entry point

npm i express - Epress installed

/////////////////
node backend/server - test for the port 5000

"start": "node backend/server" - creating a script in global package.json, so I can run server with npm start
///////////////

## app.get('/', (req, res) => {

res.send('API is running')
})
-get request to "/" it sends to the client
///////////////
I changed / export default products - backend not yet set up for es modules, so for now the following will suffice to module.exports = products
/////////////// Next route for api/products, res.json converts products into json
app.get('/api/products', (req, res) => {
res.json(products)
})

## //////////////route for single product from all the products

// single product by its \_id
app.get('/api/products/:id', (req, res) => {
const product = products.find((p) => p.\_id === req.params.id)

## // for each product find \_id that is equal to :id (from route ) (request object.params.id - the last thing in the route)

res.json(product)
})

## //////install AXIOS - http library use to make http request for backend

npm i axios

## ////////////////// nodemon as dev dependency -D, makes it so I don't have to restart the server every time the data changes on it, nodemon watches the files

npm i -D nodemon concurrently

## // script in backend package.json, nodemon runs server now

"server": "nodemon backend/server",

## // script for client to run frontend from frontend folder package.json

"client": "npm start --prefix frontend",

## //script using concurrently - to run server and client with npm run dev

"dev": "concurrently \"npm run server\" \"npm run client\"",

## // npm i dotenv

brought it into server.js then created .env file for environment variables, used for sensitive information,
also I need to make sure .env is in gitignore

## // added const PORT = process.env.PORT || 5000 into server.js

app.listen(
PORT,
console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
) so 5000 is not hardcoded and is taking the value from PORT from .env file

## Converting backend to ES modules from common JS

"type": "module", in root package.json
so I can use import/export syntax in both front and backend
(import products from './data/products.js' - reminder to put .js when i bring in JS file (not bundle like axios) or the module wont be found)

## //env variable for connecting mongoDB

v

## //mongoose - all set in backend/config/db.js

import connectDB from './config/db.js' - added import into server.js

## npm i colors

import colors from 'colors' in server.js

- colors for otherwise colorless server MongoDB messages
  .cyan.underline added after `` in db.js

## moongose models for order, product and user

## npm i bcryptjs

added users and to hash the password i need bcryptjs

## //added scripts for data import and destruction for our database called shop on mongoDB

it's in seeder.js
now it's time to change routes in backend so they use the database
new folder routes/productRoutes.js

##

added in server.js
app.use('/api/products', productRoutes)
// for anything that goes into this route above (/api/products) is going to be linked with productRoutes

## //npm install --save express-async-handler

Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
I need it in productRoutes.js

## //now Postman setup - for testing routes

## //setting up json object as a response for error in routes, instead of HTML file 
app.use((err, req, res, next) => {
  console.log('HEllo')
})

## //created middleware folder and file for error middleware

## // npm install jsonwebtoken
middleware for protecting routes

## //Example workflow with adding order
backend:
controllers/orderController.js
routes/orderRoutes.js
adding new route to server.js
then in frontend:
new constant
create action
new

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //

## //
