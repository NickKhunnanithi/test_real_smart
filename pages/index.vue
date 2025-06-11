<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="w-full bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between">
      <div class="font-semibold text-lg">Dashboard</div>
      <div class="flex items-center gap-4">
        <button @click="logout"
          class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition border border-gray-300 text-sm">Logout</button>
      </div>
    </header>
    <!-- Content -->
    <div class="max-w-5xl mx-auto py-8 space-y-8">
      <div class="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 class="text-lg font-semibold mb-4">Timeline Message</h2>
        <ChartLine :labels="labels" :datasets="countMessageDatasets" />
      </div>
      <div class="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 class="text-lg font-semibold mb-4">Timeline Keyword</h2>
        <ChartLine :labels="labels" :datasets="countMessageKeywordDatasets" />
      </div>
      <div class="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 class="text-lg font-semibold mb-4">Timeline Engagement</h2>
        <ChartBar :labels="labels" :datasets="engagementDatasets" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChartLine from '~/components/ChartLine.vue'
import ChartBar from '~/components/ChartBar.vue'

definePageMeta({ middleware: 'auth' })

const loading = ref(true)
const labels = ref([])
const countMessageDatasets = ref([])
const countMessageKeywordDatasets = ref([])
const engagementDatasets = ref([])

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const day = d.getDate()
  const month = d.toLocaleString('th-TH', { month: 'short' })
  return `${day} ${month}`
}

const engagementTypes = [
  { key: 'engagement_comment', label: 'Comment', backgroundColor: '#2563eb' },
  { key: 'engagement_share', label: 'Share', backgroundColor: '#f59e42' },
  { key: 'engagement_like', label: 'Like', backgroundColor: '#a78bfa' },
  { key: 'engagement_love', label: 'Love', backgroundColor: '#f472b6' },
  { key: 'engagement_sad', label: 'Sad', backgroundColor: '#facc15' },
  { key: 'engagement_wow', label: 'Wow', backgroundColor: '#0ea5e9' },
  { key: 'engagement_angry', label: 'Angry', backgroundColor: '#ef4444' }
]

const fetchData = async () => {
  loading.value = true
  const countMsg = await $fetch('http://localhost:8000/api/chart/count-message')
  const countMsgKeyword = await $fetch('http://localhost:8000/api/chart/count-message-keyword')
  const engagement = await $fetch('http://localhost:8000/api/chart/engagement')

  const rawLabels = Object.keys(countMsg).sort((a, b) => new Date(a) - new Date(b))
  const displayLabels = rawLabels.map(formatDate)
  labels.value = displayLabels

  countMessageDatasets.value = [{
    label: 'Count Message',
    data: rawLabels.map(d => countMsg[d] || 0),
    borderColor: '#2563eb'
  }]

  countMessageKeywordDatasets.value = Object.entries(countMsgKeyword).map(([keyword, obj], i) => ({
    label: keyword,
    data: rawLabels.map(d => obj[d] || 0),
    backgroundColor: ['#f59e42', '#e11d48', '#6366f1', '#0ea5e9', '#facc15'][i % 5]
  }))

  engagementDatasets.value = engagementTypes.map(type => ({
    label: type.label,
    data: rawLabels.map(d => (engagement[d]?.[type.key] ?? 0)),
    backgroundColor: type.backgroundColor,
    stack: 'engagement'
  }))

  loading.value = false
}

const logout = () => {
  localStorage.removeItem('token')
  window.location.reload()
}

onMounted(fetchData)
</script>