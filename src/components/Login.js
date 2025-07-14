// Login component
import { navigateTo } from '../routes/Router.js'
import { login } from '../services/auth.js'

export function renderLogin() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="container">
      <h2>Iniciar Sesión</h2>
      <form id="loginForm">
        <input type="text" name="username" placeholder="Usuario" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
        <p>¿No tienes cuenta? <a href="/register" id="goToRegister">Regístrate aquí</a></p>
      </form>
    </div>
  `

  document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const username = data.get('username')
    const password = data.get('password')

    const user = await login(username, password)

    if (user) {
      localStorage.setItem('session', JSON.stringify(user))
      navigateTo('/dashboard')
    } else {
      alert('Credenciales incorrectas')
    }
  })

  document.querySelector('#goToRegister').addEventListener('click', (e) => {
    e.preventDefault()
    navigateTo('/register')
  })
}