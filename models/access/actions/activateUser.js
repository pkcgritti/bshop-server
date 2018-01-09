const activateUser = (Model) => async (secretToken) => {
  try {
    let query = { activationToken: secretToken }
    let update = { '$set': { activated: true }, '$unset': { activationToken: '' } }
    return await Model.findOneAndUpdate(query, update, { new: true }).lean().exec()
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = activateUser
