const express = require('express')
const router = express.Router()

// Get some information
router.get('/', (req, res) => {
  res.send('Application index')
})

module.exports = router;

