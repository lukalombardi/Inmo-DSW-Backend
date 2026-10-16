const express = require('express')
const path = require('path')
const multer = require('multer')
const { prisma } = require('./shared/db.js')
const cors = require('cors')

const authRoutes = require('./auth/auth.routes.js')
const zoneRoutes = require('./zone/zone.routes.js')
const propertyTypeRoutes = require('./property-type/property-type.routes.js')
const propertyRoutes = require('./property/property.routes.js')
const inquiryRoutes = require('./inquiry/inquiry.routes.js')
const userRoutes = require('./user/user.routes.js')
const photoRoutes = require('./photo/photo.routes.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.get('/', (req, res) => {
  res.json({ message: 'Inmobiliaria API up' })
})

app.use('/auth', authRoutes)
app.use('/zones', zoneRoutes)
app.use('/property-types', propertyTypeRoutes)
app.use('/properties', propertyRoutes)
app.use('/inquiries', inquiryRoutes)
app.use('/users', userRoutes)
app.use('/photos', photoRoutes)

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Error de subida: ${err.message}` });
  }
  if (err && err.message && err.message.includes('Formato de imagen')) {
    return res.status(400).json({ error: err.message });
  }
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})