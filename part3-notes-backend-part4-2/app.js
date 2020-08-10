const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const { request } = require('express')
const url = `mongodb://localhost:27017/test`
const usersRouter = require('./controllers/users')
const loginRounter = require('./controllers/login')
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRounter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app