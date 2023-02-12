const router = require('express').Router()
const ErrorHandler = require('../errors/ErrorHandler');
const apiKeyMiddleware = require('../middleware/apiKey');
let products = require('../productData')

//products
router.get('/products', (req, res) => {
  res.render('products', {
    title: "Products title changed by ejs"
  });
})

router.get('/api/products', (req, res) => {
  res.json(products)
})

//creating new route to taking data from user OR< handling POST request

router.post('/api/products',apiKeyMiddleware, (req, res, next) => {
  // creating a error in our server
  // try {
  //   console.log(yoo)
  // } catch (error) {
  //   next(ErrorHandler.validationError(err.message))
  // }

  const { name, price } = req.body;
  if (!name || !price) {
    // return res.status(422).json({ error: 'All fields are required' })
    // throw new Error ('All fields are required')
    next(ErrorHandler.validationError('Name and price fields are required'))
  }

  const product = {
    name,
    price,
    id: new Date().getTime().toString()
  }
  products.push(product)

  res.json(product)
})

router.delete('/api/products/:productId', (req, res) => {
  products = products.filter((product) => req.params.productId !== product.id)
  res.json({ status: "Ok" })
})

module.exports = router