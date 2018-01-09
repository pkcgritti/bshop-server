const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.send('The login page')
})

router.get('/logout', (req, res) => {
  res.send('The logout page')
})

router.get('/register', (req, res) => {
  res.send('The register page')
})

module.exports = router
