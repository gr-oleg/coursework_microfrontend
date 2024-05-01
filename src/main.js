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
  'men',
  () => import('./goods/men/men.app.js'),
  () => location.pathname.startsWith('/men')
)
registerApplication(
  'kids',
  () => import('./goods/kids/kids.app.js'),
  () => location.pathname.startsWith('/kids')
)
registerApplication(
  'women',
  () => import('./goods/women/women.app.js'),
  () => location.pathname.startsWith('/women')
)

registerApplication(
  'home',
  () => import('./home/home.app.js'),
  () => location.pathname === '/'
)

registerApplication(
  'footer',
  () => import('./footer/footer.app.js'),
  () => location.pathname.startsWith('/')
)

start()
