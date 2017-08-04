function getDateString () {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

module.exports = {
  getDateString
}
