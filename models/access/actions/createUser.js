const bcrypt = require('bcryptjs')
const createUser = (Model) => async (doc) => {
  try {
    let salt = await bcrypt.genSalt(10)
    doc.password = await bcrypt.hash(doc.password, salt)
    return await Model.create(doc)
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = createUser
