const express = require('express')
const app = express()
const PORT = 4000 || process.env.PORT
const router = require('express').Router()

// converting to json
app.use(express.json())

//template view engine
app.set('view engine', 'ejs')

//static middleware for page serving in web
app.use(express.static('public'))

//router code
const mainRoutes = require('./routes/MainRoute')
const productsRoutes = require('./routes/Products')
const apiKeyMiddleware = require('./middleware/apiKey')
const ErrorHandler = require('./errors/ErrorHandler')
app.use(mainRoutes)
app.use(productsRoutes)
router.use(apiKeyMiddleware)
//router code ends


app.use((req, res, next) => {
  return res.json({ message: 'page not found' })
})


//Error handle(middleware)
app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status
      }
    })
  }
  else {
    res.status(500).json({
      error: {
        message: err.message,
        status: err.status
      }
    })
  }
})

//listening
app.listen(PORT, () => {
  console.log("Express running on " + PORT)
})
