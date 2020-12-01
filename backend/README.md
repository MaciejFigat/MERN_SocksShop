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
new reducer (orderReducer)
bring the reducer to the store.js
create action orderActions.js
we bring createOrder action into PlaceOrderScreen (into PlaceOrderHandler - using dispatch)


## //Example workflow with adding new orderController 
backend: 
creating new controller: getOrderById
creating new route: @route GET /api/orders/:id in orderRoutes.js - 
router.route('/:id').get(protect, getOrderById)
frontend:
we bring the orderDetails from the route we just created into OrderScreen.js
1. new constants in order constants ORDER_DETAILS_REQUEST etc.
2. new reducer in orderReducers.js
3. add reducer orderDetailsReducer to store.js
4. new action in orderActions.js getOrderDetails
5. create OrderScreen.js
6. add it into App.js


## //Workflow with setting up payment with PayPal
in order to receive data from paypal when user pays for the order
backend:
1. orderController -> updateOrderToPaid
2. controller into orderRoutes
frontend:
1. constants 
2. orderReducers - new reducer- orderPayReducer 
3. adding it to the store
4. order action - payOrder 
backend: 
1. go to https://developer.paypal.com/ - add new application, create sandbox accounts (1 business one personal ) copy clientID from payPal application then put it into .env as a variable
2. set up new route in server.js 
3. implementing paypal sdk script
frontend:
1. OrderScreen - request to the route and sdk script in useEffect
2. installing react-paypal-button-v2

## workflow to display user orders
_backend:_
1. new controller - getMyOrders
2. new route - in orderRoutes - to /myorders
frontend:
1. new order constants
2. new reducer
3. bring it into store.js
4. action in orderActions
5. in ProfileScreen: adding the action

## adding Admin functionality - workflow
_backend:_
1.  new userController - getUsers
2. in userRoutes we bring in the getUser controller
3. authentication for admin in authMiddleware
_frontend:_
1. constants 
2. new user reducer -userListReducer
2.1. add it to store
3. new user action - listUsers 
_backend:_
1. new screen UserListScreen.js
2. path in app.js
3. creating adming dropdown in the header

## Admin functionality for deleting users 
_backend:_
1. userController new one - deleteUser
2. bringing it into userRoutes 
_frontend:_
1. user constants
2. user reducer userDeleteReducer -> adding it to the store.js
3. new action - in userActions 
4. back into UserListScreen 
##  Admin functionality for updating user data
_backend:_
1. user controller getUserById and updateUser
2. user routes bring those 2 in
_frontend:_
1. UserEditScreen 
2. bring it into App.js 
3. fire off the getUserDetails action in UserEditScreen to fill the data in the editing form
4. Update data functionality:
constants, reducer - userUpdateReducer, adding reducer to store.js, in userActions
## Functionality for product delete  
_backend:_
1. controller for deleteProduct
2. adding it to productRoutes
_frontend:_
1. constants reducer(productDeleteReducer) adding it to the store, action (deleteProduct)
2. bring in the deleteProduct action into productListScreen
## Functionality for creating a new product or editing an existing one
_backend:_
1. controllers - createProduct and updateProduct 
2. add those into productRoutes
_frontend:_
1. constants, reducers in productReducers - adding into the store, 
2. in product actions new action for creating and editing a product
3. bring in the action of createProduct into ProductListScreen

## Uploading pictures - Multer (npm i multer) as middleware for uploading files
_in the root dir:_ 
new catalog: uploads -> file.txt
_backend:_ 
1.  in routes new file - uploadRoutes.js
2. in server.js - we bring in the uploadRoutes.js and make the /uploads static in express
_frontend:_
1. in ProductEditScreen implementation

## Admin order list 
_backend:_
1. orderController ->getOrders
2. routes in orderRoutes
_frontend:_
1. ORDER_LIST_ constants, reducer orderListReducer, bring it into store.js
2. action

## Admin - order delivered button 
_backend:_
1. controller - updateOrderToDelivered 
2. orderRoutes 
_frontend:_
1. constants, reducer - orderDeliverReducer, add to store.js
2. action - deliverOrder, add it to OrderScreen

## adding and config of morgan (npm i morgan) 
_backend:_ 
1.  in server.js - middleware for morgan - it shows me GET PUT POST DELETE calls I make to my API

## review functionality 
_backend:_
1. controller - createProductReview - add in the routes
_frontend:_
1. constants, 
2. reducer in productReducers - productReviewCreateReducer -add to store.js
3. in productActions - createProductReview
4. implementing the above mentioned into ProductScreen

## implementing SearchBox in the Header 
1. passing (history) props in the Header when I render <SearchBox/> there, is impossible 
2. I pass it in Route and then it will have access to props 
``<Route render={({ history }) => <SearchBox history={history} />} />``

## Pagination 
_backend:_
1. productController -> in getProducts: const pageSize = 10 - amount of products on a page

const pageSize = 2
const page = Number(req.query.pageNumber) || 1

const count = await Product.count({...keyword})

const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1) )
it will give me correct amount of products and correct place for them 

_frontend:_
1. product actions - listProducts updated ( to include pageNumber = '' and &pageNumber=${pageNumber} - in axios call)
2. reducer update - productListReducer - products: action.payload in case PRODUCT_LIST_SUCCESS to
      return { loading: false, products: action.payload.products pages: action.payload.pages, page: action.payload.page } } - because in controller it's  res.json({products, page, pages: Math.ceil(count /pageSize)}) instead of res.json(products)
3. paths in app.js
4. in HomeScreen.js - const pageNumber = match.params.pageNumber || 1, also in useEffect - dispatch
5. Create Paginate.js - component that uses React-bootstrap component Pagination
6. in HomeScreen - render the Paginate component, 
keyword={keyword && keyword} - this means if keyword exist then use keyword
keyword={keyword ? keyword : ''} - ternary operator - if it exists then use keyword if not just an empty string ('')

## adding Paginate.js into admin ProductListScreen

## carousel with highest rated products
_backend:_
1. new productController - getTopProducts 
await Product.find({}).sort({ rating: -1 }).limit(3) - (sort rating -1) means ascending order, limit to 3 products
2. into productRoutes 
_frontend:_
1. constants + reducer + add to store
2. now I need to call the action to fetch those products: productActions- _listTopProducts_
3. creating new component ProductCarousel.js
## shortcuts for VSC
duplicate line 
Shift + Alt + Up/Down
## 
same words as the one highlighted
Ctrl+D


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

