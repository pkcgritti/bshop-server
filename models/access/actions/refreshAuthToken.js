const { newTokenQuery, futureDate } = require('../utils')

const refreshAuthToken = (Model) => async (token, extended) => {
  try {
    if (!token) return null
    let query = newTokenQuery(token)
    let update = { '$set': { 'expires': futureDate(extended) } }
    let authtoken = await Model.findOneAndUpdate(query, update, { new: true }).lean().exec()
    return authtoken
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = findAuthToken
