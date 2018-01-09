const crypto = require('crypto')
const secret = 'TiGeR WiTh Cr4mP iN Th3 l3g'
const hash = crypto.createHmac('sha256', secret)

const splitToken = (token) => {
  let selector = token.substr(0, 12)
  let validator = crypto.createHmac('sha256', secret)
    .update(token.substr(12))
    .digest('hex')
  return {
    selector,
    validator
  }
}

const authTokenHasExpired = (authtoken) => {
  let now = new Date(Date.now())
  return +authtoken.expires < +now
}

const newTokenQuery = (token) => {
  return {
    ...splitToken(token),
    expires: { '$gt': new Date(Date.now()) }
  }
}

const standardOffset = 5                // 5 Minutes
const extendedOffset = 60 * 24 * 30 * 6 // 6 Months
const futureDate = (extended) => {
  let offset = (extended) ? extendedOffset : standardOffset
  return new Date(Date.now() + offset * 60000)
}

module.exports = {
  hashFcn: hash,
  splitToken,
  futureDate,
  newTokenQuery,
  authTokenHasExpired
}
