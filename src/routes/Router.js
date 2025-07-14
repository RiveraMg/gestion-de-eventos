// Custom Router with guards
import { renderLogin } from '../components/Login.js'
import { renderRegister } from '../components/Register.js'
import { renderDashboard } from '../components/Dashboard.js'
import { renderCreateEvent } from '../components/CreateEvent.js'
import { renderEditEvent } from '../components/EditEvent.js'
import { renderNotFound } from '../components/NotFound.js'
import { isAuthenticated, getUser } from '../utils/guard.js'

// Definimos las rutas disponibles
const routes = {
  '/login': renderLogin,
  '/register': renderRegister,
  '/dashboard': renderDashboard,
  '/dashboard/events/create': renderCreateEvent,
  '/dashboard/events/edit': renderEditEvent
}

export function initRouter() {

  // Cargar vista inicial según la ubicacion del usuario
  navigateTo(location.pathname)

  window.onpopstate = () => navigateTo(location.pathname)

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (link && link.href.startsWith(location.origin)) {
      e.preventDefault()
      navigateTo(new URL(link.href).pathname)
    }
  })
}

export function navigateTo(path) {
  const app = document.getElementById('app')
  const user = getUser()

  // Rutas protegidas: redirigir a NotFound si no está logueado
  const isPublic = path === '/login' || path === '/register'

  if (!isAuthenticated() && !isPublic) {
    history.pushState({}, '', '/not-found')
    renderNotFound()
    return
  }

  // Si ya está logueado y va a login o register, lo mandamos al dashboard
  if (isAuthenticated() && isPublic) {
    history.pushState({}, '', '/dashboard')
    renderDashboard()
    return
  }

  // Si la ruta existe, renderiza la vista
  const view = routes[path]
  if (view) {
    history.pushState({}, '', path)
    view()
  } else {
    history.pushState({}, '', '/not-found')
    renderNotFound()
  }
}