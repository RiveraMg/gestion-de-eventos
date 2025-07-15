// Route guards
export function getUser () {
  const session = localStorage.getItem('session')
  return session ? JSON.parse(session) : null
}

export function isAuthenticated () {
  return !!getUser()
}
