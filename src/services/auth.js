// Auth service
export async function login(username, password) {
  try {
    const res = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`)
    const users = await res.json()
    return users.length ? users[0] : null
  } catch (err) {
    console.error('Login error:', err)
    return null
  }
}