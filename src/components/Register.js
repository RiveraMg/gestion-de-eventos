// Register component
import { navigateTo } from '../routes/Router.js'

export function renderRegister() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="container">
      <h2>Registro</h2>
      <form id="registerForm">
        <input type="text" name="username" placeholder="Usuario" required />
        <input type="email" name="email" placeholder="Correo" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <select name="role" required>
          <option value="">Selecciona un rol</option>
          <option value="admin">Administrador</option>
          <option value="visitor">Visitante</option>
        </select>
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="/login" id="goToLogin">Inicia sesión</a></p>
      </form>
    </div>
  `

  document.querySelector('#registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const user = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      role: data.get('role')
    }

    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })

    if (res.ok) {
      alert('Registro exitoso, ahora puedes iniciar sesión')
      navigateTo('/login')
    } else {
      alert('Error al registrarse')
    }
  })

  document.querySelector('#goToLogin').addEventListener('click', (e) => {
    e.preventDefault()
    navigateTo('/login')
  })
}