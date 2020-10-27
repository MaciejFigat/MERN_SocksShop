import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
  next()
})
// for anything that goes into this route above (/api/products) is going to be linked with productRoutes
app.use('/api/products', productRoutes)

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