import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
  next()
})
// for anything that goes into this route above (/api/products) is going to be linked with productRoutes
app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// route for paypal, so when we are ready to make the payment we will hit this route and fetch this client_id
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// this makes /uploads folder static, __dirname in Node.js will point into current directory - only available in common js not in ES Modules so I'll create a __dirname variable to mimic this in ES modules
const __dirname = path.resolve()
// path.join(__dirname, '/uploads') - this is taking me to uploads folder and with express.static it's being made static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// this is for bad route - 404 error
app.use(notFound)

//middleware example - detects requests for the routes

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
