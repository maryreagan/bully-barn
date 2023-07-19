const isValidPwd = (password) => {
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/
  return pwdRegex.test(password)
}

module.exports = isValidPwd