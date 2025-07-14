// Not Found view
export function renderNotFound() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="container">
      <h2>404 - Página no encontrada</h2>
      <a href="/dashboard" onclick="event.preventDefault(); window.history.pushState({}, '', '/dashboard'); window.dispatchEvent(new Event('popstate'));">Ir al Dashboard</a>
    </div>
  `
}