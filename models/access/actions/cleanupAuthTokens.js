const cleanupAuthTokens = (Model) => async () => {
  try {
    return await Model.remove({ 'expires': { '$lt': new Date(Date.now()) } }).lean().exec()
  } catch (e) {
    return e
  }
}

module.exports = cleanupAuthTokens
