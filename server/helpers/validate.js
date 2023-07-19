const isValidPwd = (password) => {
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/
  return pwdRegex.test(password)
}

const isValidEmail = (email) => {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

module.exports = {isValidPwd, isValidEmail}