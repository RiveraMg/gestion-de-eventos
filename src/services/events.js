// Events service
export async function getAllEvents() {
  const res = await fetch('http://localhost:5000/events')
  return await res.json()
}

export async function registerToEvent(eventId, user) {
  const regCheck = await fetch(`http://localhost:5000/registrations?eventId=${eventId}&username=${user.username}`)
  const exists = await regCheck.json()
  if (exists.length > 0) return false

  const eventRes = await fetch(`http://localhost:5000/events/${eventId}`)
  const event = await eventRes.json()
  const regRes = await fetch(`http://localhost:5000/registrations?eventId=${eventId}`)
  const currentRegs = await regRes.json()

  if (currentRegs.length >= event.capacity) return false

  await fetch(`http://localhost:5000/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, username: user.username })
  })
  return true
}