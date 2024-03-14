export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
  return emailPattern.test(email)
}
export function filterEmail(email) {
  const atIndex = email.indexOf('@')
  if (atIndex !== -1) {
      return email.slice(0, atIndex)
  } else {
      return email
  }
}