const findUserByEmail = (Model) => async (email) => {
  try {
    let query = { email: email }
    let users = await Model.find(query).lean().exec()
    if (users.length && users[0].activated) return users[0]
    return null
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = findUserByEmail
