const conn = require('../../modules/mongooseConnection')

// User rules
const UserSchema = require('./schemas/user')
const UserModel = conn.model('Users', UserSchema)

const findUserById = require('./actions/findUserById')(UserModel)
const findUserByEmail = require('./actions/findUserByEmail')(UserModel)
const findUserByUserName = require('./actions/findUserByUserName')(UserModel)
const createUser = require('./actions/createUser')(UserModel)
const activateUser = require('./actions/activateUser')(UserModel)

const checkPassword = require('./actions/checkPassword')

// AuthToken rules
const AuthTokenSchema = require('./schemas/authtoken')
const AuthTokenModel = conn.model('AuthTokens', AuthTokenSchema)

const findAuthToken = require('./actions/findAuthToken')(AuthTokenModel)
const createAuthToken = require('./actions/createAuthToken')(AuthTokenModel)
const cleanupAuthTokens = require('./actions/cleanupAuthTokens')(AuthTokenModel)

module.exports = {
  // User
  findUserById,
  findUserByEmail,
  findUserByUserName,
  createUser,
  activateUser,
  checkPassword,
  // Auth Token
  findAuthToken,
  createAuthToken,
  cleanupAuthTokens
}
