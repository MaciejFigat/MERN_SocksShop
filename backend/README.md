Short reminder of my actions:
(consider backend)
npm init - backend initialized with server.js as entry point
npm i express - Epress installed

/////////////////
node backend/server - test for the port 5000

"start": "node backend/server" - creating a script in global package.json, so I can run server with npm start
///////////////
app.get('/', (req, res) => {
res.send('API is running')
})
-get request to "/" it sends to the client
///////////////
I changed / export default products - backend not yet set up for es modules, so for now the following will suffice to module.exports = products
/////////////// Next route for api/products, res.json converts products into json
app.get('/api/products', (req, res) => {
res.json(products)
})
//////////////route for single product from all the products
// single product by its \_id
app.get('/api/products/:id', (req, res) => {
const product = products.find((p) => p.\_id === req.params.id)
// for each product find \_id that is equal to :id (from route ) (request object.params.id - the last thing in the route)
res.json(product)
})
//////install AXIOS - http library use to make http request for backend
npm i axios
