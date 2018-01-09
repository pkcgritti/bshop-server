const findUserById = (Model) => async (id) => {
  try {
    let user = await Model.findById(id).lean().exec()
    if (user.activated) return user
    return null
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = findUserById
