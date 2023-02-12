const router = require('express').Router();
const path = require('path')

//index
router.get('/', (req, res) => {
  res.render('index', {
    title: "Home title changed by ejs"
  });
})
//about
router.get('/about', (req, res) => {
  res.render('about', {
    title: "About title changed by ejs"
  });
})


router.get('/download', (req, res) => {
  res.download(path.join(__dirname, '../views', 'about.ejs'))
})

// router.get('/api/products', (req, res) => {
//   res.json([
//     {
//       "id": 123,
//       "name": "Chrome",
//     },
//     {
//       "id": 124,
//       "name": "Firefox",
//     },
//     {
//       "id": 125,
//       "name": "Opera",
//     },
//   ])
// })

module.exports = router
