// Edit Event view
import { navigateTo } from '../routes/Router.js'

export async function renderEditEvent() {
  const app = document.getElementById('app')
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  const res = await fetch(`http://localhost:5000/events/${id}`)
  const event = await res.json()

  app.innerHTML = `
    <div class="container">
      <h2>Editar Evento</h2>
      <form id="editForm">
        <input type="text" name="name" value="${event.name}" required />
        <input type="date" name="date" value="${event.date}" required />
        <textarea name="desprition" value="${event.description}" required />
        <input type="number" name="capacity" value="${event.capacity}" required />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  `

  document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const updatedEvent = {
      name: data.get('name'),
      date: data.get('date'),
      description: data.get('desprition'),
      capacity: Number(data.get('capacity'))
    }

    await fetch(`http://localhost:5000/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    })

    navigateTo('/dashboard')
  })
}