const Schema = require('mongoose').Schema

const AuthTokenSchema = module.exports = new Schema({
  selector: { type: String, required: true },
  validator: { type: String, required: true },
  useremail: { type: String, required: true },
  expires: { type: Date, required: true }
})
