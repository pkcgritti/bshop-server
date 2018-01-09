const bcrypt = require('bcryptjs')
const checkPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch(e) {
    console.log(e)
    return false
  }
}

module.exports = checkPassword
