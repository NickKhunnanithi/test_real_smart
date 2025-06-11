const mysql = require('mysql2')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'real_smart',
  dateStrings: true
}).promise()
module.exports = db