<template>
  <ClientOnly>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <form @submit.prevent="onLogin"
        class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-5 border border-gray-200">
        <h2 class="text-3xl font-bold text-center mb-0">Login</h2>
        <p class="text-gray-500 text-center -mt-3 mb-2">Log in to your account</p>
        <div>
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" placeholder="Please enter your Email" required
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input v-model="password" type="password" placeholder="Please enter your password" required
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>
        </div>
        <div class="flex justify-end">
          <a href="#" class="text-blue-600 text-sm hover:underline">Forgot Password?</a>
        </div>
        <button type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-lg">Sign
          in</button>
        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
      </form>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ middleware: 'auth' })

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const onLogin = async () => {
  error.value = ''
  try {
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      error.value = data.error || 'Login failed'
    }
  } catch (e) {
    error.value = 'Login failed'
  }
}
</script>