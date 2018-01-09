const Schema = require('mongoose').Schema

const UserSchema = module.exports = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  avatar: { type: String },
  role: { type: String },
  activated: { type: Boolean, required: true },
  activationToken: { type: String }
})
