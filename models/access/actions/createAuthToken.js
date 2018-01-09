const { splitToken, futureDate } = require('../utils')

const createAuthToken = (Model) => async (token, useremail, extended) => {
  try {
    let splitedToken = splitToken(token)
    console.log('Here is your splited token ')
    console.log(splitedToken.selector)
    console.log(splitedToken.validator)
    let doc = {
      selector: splitedToken.selector,
      validator: splitedToken.validator,
      useremail: useremail,
      expires: futureDate(extended)
    }
    return await Model.create(doc)
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = createAuthToken
