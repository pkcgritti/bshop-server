const Controller = require('./controller')
const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const randToken = require('rand-token')

const cleaner = setInterval(() => {
  console.log('Cleaning up old tokens')
  Controller.cleanupAuthTokens()
}, 1000 * 60)

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    let user = await Controller.findUserByEmail(email)
    if (user) {
      if (await Controller.checkPassword(password, user.password)) {
        return done(null, user)
      }
      return done(null, false, { message: 'Incorrect password' })
    }
    return done(null, false, { message: 'Incorrect email' })
}))

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  let user = await Controller.findUserById(id)
  done(null, user)
})

router.get('/userinfo', async (req, res, next) => {
  if (!req.user) return res.status(401).send('Unauthorized')
  res.status(200).json({
    username: req.user.username,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    avatar: req.user.avatar,
    role: req.user.role
  })
})

router.head('/validatetoken', async (req, res, next) => {
  let authtoken = await Controller.findAuthToken(req.cookies.token)
  if (!authtoken) {
    if (req.user) req.logout()
    return res.status(401).send()
  }

  if (!req.user) {
    let user = await Controller.findUserByEmail(authtoken.useremail)
    if (user) req.login(user, (err) => { if (err) return next(err) })
  }

  return res.status(200).send()
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
  console.log(req.body)
  let authtoken = randToken.generate(32)
  let extended = req.body.rememberMe || false
  let newAuthToken = await Controller.createAuthToken(authtoken, req.body.email, extended)

  if (newAuthToken) {
    res.cookie('token', authtoken, { maxAge: 900000, httpOnly: true })
    res.cookie('extended', extended, { maxAge: 900000, httpOnly: true })
    return res.status(202).send('Ok')
  }

  return res.status(400).send('Failed')
})

router.post('/logoff', async (req, res) => {

})

router.post('/signup', async (req, res) => {
  let doc = req.body

  if (await Controller.findUserByEmail(doc.email)) {
    return res.status(400).json({
      field: 'email',
      message: 'O e-mail informado já existe',
      error: 'O e-mail informado já existe'
    })
  }

  let activationToken = randToken.generate(32)
  Object.assign(doc, { activated: false, activationToken: activationToken, role: 'client' })

  let newUser = await Controller.createUser(doc)
  if (!newUser) return res.status(400).json({
    error: 'Não foi possível criar o usuário'
  })

  res.mailer.send('email', {
    to: newUser.email,
    subject: 'Ative sua conta',
    link: 'http://192.168.10.122:3000/access/activate?t=' + activationToken
  }, (err) => {
    if (err) console.log(err)
  })

  res.status(202).json(newUser)
})

router.get('/activate', async (req, res) => {
  let secretToken = req.query.t
  if (!secretToken) return res.status(400).send('Nenhum token foi especificado')
  let modifiedUser = await Controller.activateUser(secretToken)
  if (modifiedUser) return res.status(200).send('Obrigado, ' + modifiedUser.firstname
    + ' ' + modifiedUser.lastname + ', sua conta (' + modifiedUser.email + ') foi atividada' +
    + ' com sucesso.')
  return res.status(400).send('Token não foi encontrado')
})

module.exports = router
