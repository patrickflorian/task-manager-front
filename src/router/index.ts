/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(
    routes.map(route => ({
      ...route,
      meta: {
        layout: route.path.startsWith('/app') ? AppLayout : undefined,
        ...route.meta,
      },
    }))
  ),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthStatus() // Replace with your actual auth check
  const requiresAuth = to.path.startsWith('/app')
  const isAuthRoutes = to.path.startsWith('/auth')

  if (requiresAuth && !isAuthenticated) {
    next({ name: '/auth/login' }) // Replace 'Login' with your login route name
  } else {
    if (isAuthRoutes && isAuthenticated) {
      next({ name: '/app/tasks/' }) // Replace 'Dashboard' with your dashboard route name
    }
    next()
  }
})

function checkAuthStatus () {
  // Implement your authentication check logic here
  // This is a placeholder, replace it with actual authentication check
  return !!localStorage.getItem('auth-token')
}

export default router
