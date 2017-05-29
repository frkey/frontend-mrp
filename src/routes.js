import DashView from './components/Dash.vue'
import UnauthorizedView from './components/401.vue'
import ForbbidenView from './components/403.vue'
import NotFoundView from './components/404.vue'
import ErrorView from './components/500.vue'
import AccessToken from './components/AccessToken.vue'
import Logout from './components/Logout.vue'
import Credentials from './components/Credentials.vue'
// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import ProductView from './components/views/ProductView.vue'
import StructureView from './components/views/StructureView.vue'

// Routes
const routes = [
  {
    path: '/',
    component: DashView,
    children: [{
      path: 'dashboard',
      alias: '',
      component: DashboardView,
      name: ''
    }, {
      path: '/credentials',
      component: Credentials,
      name: '',
      meta: {description: ''}
    }, {
      path: '/products',
      component: ProductView,
      name: ''
    }, {
      path: '/products/:productId/structure',
      component: StructureView,
      name: ''
    }]
  }, {
    path: '/unauthorized',
    component: UnauthorizedView
  }, {
    path: '/forbbiden',
    component: ForbbidenView
  }, {
    path: '/error',
    component: ErrorView
  }, {
    path: '/token',
    component: AccessToken
  }, {
    path: '/logout',
    component: Logout
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
