import { registerApplication, start } from 'single-spa'
import { createStore } from './store/index.js'

window.store = createStore()


registerApplication(
  'navbar',
  () => import('./navbar/react.app.js'),
  () => location.pathname.startsWith('/')
)

registerApplication(
  'login',
  () => import('./login/login.app.js'),
  () => location.pathname.startsWith('/login')
)

registerApplication(
  'chairs',
  () => import('./goods/chairs/chairs.app.js'),
  () => location.pathname.startsWith('/chairs')
)
registerApplication(
  'tables',
  () => import('./goods/tables/tables.app.js'),
  () => location.pathname.startsWith('/tables')
)
registerApplication(
  'sofas',
  () => import('./goods/sofas/sofas.app.js'),
  () => location.pathname.startsWith('/sofas')
)

registerApplication(
  'footer',
  () => import('./footer/footer.app.js'),
  () => location.pathname.startsWith('/')
)

start()
