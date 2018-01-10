const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const mailer = require('express-mailer')
const socket = require('socket.io')

// Import routes
const routes = require('./routes/index')
const users = require('./routes/users')
const access = require('./models/access/routes')

// Initialize application
const app = express()

// Cors Middleware
const whitelist = [/localhost/, /192\.168\.10\./, /192\.168\.100\./]
const corsOptions = {
  origin (orig, cb) {
    console.log(orig)
    if (!orig) return cb(null, true)
    if (whitelist.some(patt => orig.match(patt))) {
      console.log('Origin match')
      return cb(null, true)
    }
    return cb(new Error('Unkown origin'))
  },
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Public folder
app.use(express.static(path.join(__dirname, 'public')))

// Express Session
app.use(session({
  secret: 'TiGeR WiTh Cr4mP iN Th3 l3g',
  saveUninitialized: true,
  resave: true
}))

// Setup passport
app.use(passport.initialize())
app.use(passport.session())

// Setup mailer
// Setup mailer
mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP'
})

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use('/access', access)
app.use('/', routes)
app.use('*', (req, res) => {
  res.send('Error 404. Not found.')
})

// Set Port
app.set('port', (process.env.PORT || 3000))

const server = app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'))
})

const io = socket.listen(server)
io.on('connect', (socket) => {
  console.log('New socket connection with ID ' + socket.id)
  let i = 0
  setInterval(() => {
    socket.emit('MESSAGE', 'Date: ' + new Date())
  }, 1000)

  socket.on('broadcast', (data) => {
    io.sockets.emit('broadcast', data)
  })

})
