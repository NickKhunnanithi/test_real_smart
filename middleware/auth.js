export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
    if (token && to.path === '/login') {
      return navigateTo('/')
    }
  }
})