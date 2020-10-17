## After i set up server.js

//////install AXIOS - http library use to make http request for backend
npm i axios

## /////

added proxy at frontend package.json
"proxy": "http://127.0.0.1:5000",

## REDUX setup (in frontend)
npm i redux react-redux redux-thunk
thunk is middleware to make asynchronous requests
## in index.js - import { Provider } from 'react-redux' wrapping everything with <Provider>
creating store.js

## creating reducers ie. productReducer
in order to use it I need to add it to the store

## after setting listProducts action in productActions.js
I want to fire it off in HomeScreen.js
I no longer need to link it with axios directly so I can get rid of the 
 const { data } = await axios.get('/api/products') in useEffect
## in useEffect I dispatch listProducts
 which in our actions fired off PRODUCT_LIST_REQUEST
## it happened to be successful (PRODUCT_LIST_SUCCESS - it passed the data into payload (payload: data))
## in reducer that data (that was put into payload) is getting put into products 
products: action.payload - on a successful response 
## useSelector - to display data that was put into products from payload
in HomeScreen.js 
const productList = useSelector(state => state.productList)

productList comes from state in store.js - reducer (which uses combined reducers)
## const { loading, error, products } = productList 
I'm pulling loading, error, products from state (it's in productListReducer)
## /////////////////
## /////////////////
## /////////////////
## /////////////////
## /////////////////
## /////////////////
## /////////////////
## /////////////////
## /////////////////
## /////////////////
