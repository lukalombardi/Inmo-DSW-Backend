const express = require('express')
const { prisma } = require('./db.js')

const zonaRoutes = require('./zona/zona.routes.js')
const tipoRoutes = require('./tipo/tipo.routes.js')
const app = express()

app.use(express.json())            

app.get('/', (req, res) => {
  res.json({ message: 'Inmobiliaria API up' })
})

app.use('/zonas', zonaRoutes)      
app.use('/tipos', tipoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})