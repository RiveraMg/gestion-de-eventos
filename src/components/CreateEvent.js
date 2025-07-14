// Create Event view
import { navigateTo } from '../routes/Router.js'

export function renderCreateEvent() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="container">
      <h2>Crear Evento</h2>
      <form id="eventForm">
        <input type="text" name="name" placeholder="Nombre del evento" required />
        <input type="date" name="date" required />
        <textarea name="desprition" placeholder="Descripcion del evento" required />
        <input type="number" name="capacity" placeholder="Capacidad" required />
        <button type="submit">Crear</button>
      </form>
    </div>
  `

  document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const newEvent = {
      name: data.get('name'),
      date: data.get('date'),
      description: data.get('desprition'),
      capacity: Number(data.get('capacity'))
    }

    await fetch('http://localhost:5000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })

    navigateTo('/dashboard')
  })
}