// Dashboard view
import { getUser } from '../utils/guard.js'
import { getAllEvents, registerToEvent } from '../services/events.js'
import { navigateTo } from '../routes/Router.js'

export async function renderDashboard() {
  const user = getUser()
  const app = document.getElementById('app')
  const events = await getAllEvents()

  let eventsHtml = ''
  for (const event of events) {
    eventsHtml += `
      <div class="event">
        <h3>${event.name}</h3>
        <p>${event.date} | Cupo: ${event.capacity}</p>
        ${
          user.role === 'admin'
            ? `<button onclick="editEvent(${event.id})">Editar</button>
               <button onclick="deleteEvent(${event.id})">Eliminar</button>`
            : <button onclick="register(${event.id})">Registrarse</button>
        }
      </div>
    `
  }

  app.innerHTML = `
    <div class="container">
      <h2>Bienvenido, ${user.username}</h2>
      <nav>
        ${user.role === 'admin' ? '<a href="/dashboard/events/create" id="createEvent">Crear Evento</a>' : ''}
        <button id="logout">Cerrar Sesión</button>
      </nav>
      <div>${eventsHtml}</div>
    </div>
  `

  document.getElementById('logout').onclick = () => {
    localStorage.removeItem('session')
    navigateTo('/login')
  }

  if (user.role === 'admin') {
    document.getElementById('createEvent').onclick = (e) => {
      e.preventDefault()
      navigateTo('/dashboard/events/create')
    }

    window.editEvent = (id) => navigateTo('/dashboard/events/edit?id=' + id)
    window.deleteEvent = async (id) => {
      await fetch(`http://localhost:5000/events/${id}, { method: 'DELETE' }`)
      renderDashboard()
    }
  } else {
    window.register = async (eventId) => {
      const res = await registerToEvent(eventId, user)
      if (res) alert('Registrado correctamente')
      else alert('Ya estás registrado o no hay cupos')
    }
  }
}