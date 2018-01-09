const findUserByUserName = (Model) => async (username) => {
  try {
    let query = { username: username }
    let users = await Model.find(query).lean().exec()
    if (users.length && users[0].activated) return users[0]
    return null
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = findUserByUserName
