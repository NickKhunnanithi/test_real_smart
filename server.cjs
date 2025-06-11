const express = require('express');
const cors = require('cors');
const db = require('./db.cjs')

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {  // Mock authentication
    return res.json({ token: 'mock-token', user: { email } });
  }
  res.status(400).json({ error: 'Invalid credentials' });
});

// chart 1
app.get('/api/chart/count-message', async (req, res) => {
  const [rows] = await db.query(
    "SELECT DATE_FORMAT(publisheddate, '%Y-%m-%d') as date, COUNT(*) as count FROM messages GROUP BY date"
  )
  const result = {}
  rows.forEach(row => {
    result[row.date] = row.count
  })
  res.json(result)
});

// chart 2
app.get('/api/chart/count-message-keyword', async (req, res) => {
  const [rows] = await db.query(
    "SELECT DATE_FORMAT(publisheddate, '%Y-%m-%d') as date, keyword FROM messages"
  )
  const result = {}
  rows.forEach(row => {
    const date = row.date
    const keywords = (row.keyword || '')
      .replace(/^{|}$/g, '')
      .split(',')
      .map(k => k.trim())
    keywords.forEach(keyword => {
      if (!keyword) return
      if (!result[keyword]) result[keyword] = {}
      result[keyword][date] = (result[keyword][date] || 0) + 1
    })
  })
  res.json(result)
})

// chart 3
app.get('/api/chart/engagement', async (req, res) => {
  const [rows] = await db.query(
    `SELECT DATE_FORMAT(publisheddate, '%Y-%m-%d') as date,
      SUM(engagement_comment) as engagement_comment,
      SUM(engagement_share) as engagement_share,
      SUM(engagement_like) as engagement_like,
      SUM(engagement_love) as engagement_love,
      SUM(engagement_sad) as engagement_sad,
      SUM(engagement_wow) as engagement_wow,
      SUM(engagement_angry) as engagement_angry
     FROM messages
     GROUP BY date`
  )
  const result = {}
  rows.forEach(row => {
    result[row.date] = {
      engagement_comment: row.engagement_comment || 0,
      engagement_share: row.engagement_share || 0,
      engagement_like: row.engagement_like || 0,
      engagement_love: row.engagement_love || 0,
      engagement_sad: row.engagement_sad || 0,
      engagement_wow: row.engagement_wow || 0,
      engagement_angry: row.engagement_angry || 0,
    }
  })
  res.json(result)
})

app.listen(8000, () => {
  console.log('API server running on http://localhost:8000');
});