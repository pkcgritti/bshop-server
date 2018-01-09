const { newTokenQuery } = require('../utils')

const findAuthToken = (Model) => async (token) => {
  try {
    if (!token) return null
    let query = newTokenQuery(token)
    console.log('----------------------------')
    console.log(query)
    let authtokenlist = await Model.find(query).lean().exec()
    console.log(authtokenlist)
    let authtoken = (authtokenlist.length) ? authtokenlist[0] : null

    return authtoken
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = findAuthToken
