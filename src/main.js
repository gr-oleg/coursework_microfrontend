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

start()
