const express = require('express')
const path = require('path')
const multer = require('multer')
const { prisma } = require('./shared/db.js')
const cors = require('cors')

const authRoutes = require('./auth/auth.routes.js')
const zonaRoutes = require('./zona/zona.routes.js')
const tipoRoutes = require('./tipo/tipo.routes.js')
const propiedadRoutes = require('./propiedad/propiedad.routes.js')
const consultaRoutes = require('./consulta/consulta.routes.js')
const usuarioRoutes = require('./usuario/usuario.routes.js')
const fotoRoutes = require('./foto/foto.routes.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.get('/', (req, res) => {
  res.json({ message: 'Inmobiliaria API up' })
})

app.use('/auth', authRoutes)
app.use('/zonas', zonaRoutes)
app.use('/tipos', tipoRoutes)
app.use('/propiedades', propiedadRoutes)
app.use('/consultas', consultaRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/fotos', fotoRoutes)

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