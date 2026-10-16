// Prueba end to end de la API (Node puro, sin dependencias).
// Uso: docker compose exec -T inmo-back node scripts/e2e.test.js
// Necesita la API levantada y la variable API_KEY (el contenedor ya la tiene por el .env).

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const API_KEY = process.env.API_KEY;
const TS = Date.now();

const results = [];
const notes = [];
const ids = {};

// PNG de 1x1 px
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

async function req(method, path, { body, token, apiKey, form } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers['x-api-key'] = apiKey;
  let payload;
  if (form) {
    payload = form;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  try {
    const res = await fetch(BASE + path, { method, headers, body: payload });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch (_) { data = text; }
    return { status: res.status, body: data };
  } catch (error) {
    return { status: 0, body: `fetch fallo: ${error.message}` };
  }
}

function check(name, ok, res, expected) {
  const passed = Boolean(ok);
  results.push({ test: name, esperado: expected, obtenido: res ? res.status : '-', ok: passed ? 'OK' : 'FALLA' });
  if (!passed) {
    console.log(`\n✗ ${name}`);
    console.log(`  esperado: ${expected} | status: ${res ? res.status : '-'}`);
    console.log(`  body: ${res ? JSON.stringify(res.body) : '-'}`);
  }
  return passed;
}

const expectStatus = async (name, expected, promise, extra = () => true) => {
  const res = await promise;
  const okStatus = Array.isArray(expected) ? expected.includes(res.status) : res.status === expected;
  let okExtra = false;
  try { okExtra = okStatus && extra(res.body); } catch (_) { okExtra = false; }
  check(name, okStatus && okExtra, res, Array.isArray(expected) ? expected.join('/') : expected);
  return res;
};

const photoForm = (propertyId, { field = 'image', type = 'image/png', filename = 'test.png', content = PNG } = {}) => {
  const form = new FormData();
  if (propertyId !== undefined) form.append('propertyId', String(propertyId));
  if (field) form.append(field, new Blob([content], { type }), filename);
  return form;
};

const propertyBody = (overrides = {}) => ({
  rooms: 3,
  squareMeters: 85.5,
  garage: true,
  creditEligible: false,
  description: 'Departamento de prueba e2e',
  operation: 'SALE',
  address: 'Calle Falsa 123',
  latitude: -32.9468,
  longitude: -60.6393,
  currency: 'USD',
  price: 120000,
  propertyTypeId: ids.type1,
  zoneId: ids.zone1,
  userId: ids.admin,
  ...overrides
});

async function main() {
  if (!API_KEY) console.log('AVISO: falta API_KEY en el entorno, los tests de usuarios van a fallar');

  await expectStatus('GET / (health)', 200, req('GET', '/'));

  // ---------- USUARIOS ----------
  const adminEmail = `admin.${TS}@e2e.com`;
  const operatorEmail = `operator.${TS}@e2e.com`;
  const adminBody = { name: 'Admin E2E', email: adminEmail, password: 'admin123', role: 'ADMIN' };

  await expectStatus('POST /users sin API key', 401, req('POST', '/users', { body: adminBody }));
  await expectStatus('POST /users API key incorrecta', 403, req('POST', '/users', { body: adminBody, apiKey: 'incorrecta' }));
  let r = await expectStatus('POST /users admin', 201, req('POST', '/users', { body: adminBody, apiKey: API_KEY }),
    (b) => b.role === 'ADMIN' && b.name === 'Admin E2E' && b.password === undefined);
  ids.admin = r.body.id;
  r = await expectStatus('POST /users operator', 201, req('POST', '/users', {
    body: { name: 'Operator E2E', email: operatorEmail, password: 'oper123', role: 'OPERATOR' }, apiKey: API_KEY
  }), (b) => b.role === 'OPERATOR');
  ids.operator = r.body.id;
  await expectStatus('POST /users email duplicado', 409, req('POST', '/users', { body: adminBody, apiKey: API_KEY }));
  await expectStatus('POST /users role viejo OPERADOR', 400, req('POST', '/users', {
    body: { ...adminBody, email: `x.${TS}@e2e.com`, role: 'OPERADOR' }, apiKey: API_KEY
  }));
  await expectStatus('POST /users campos viejos (nombre, rol)', 400, req('POST', '/users', {
    body: { nombre: 'Viejo', email: `viejo.${TS}@e2e.com`, password: 'x', rol: 'ADMIN' }, apiKey: API_KEY
  }));

  // ---------- LOGIN ----------
  r = await expectStatus('POST /auth/login admin', 200, req('POST', '/auth/login', { body: { email: adminEmail, password: 'admin123' } }),
    (b) => typeof b.token === 'string' && b.user.role === 'ADMIN' && b.user.name === 'Admin E2E');
  const adminToken = r.body.token;
  r = await expectStatus('POST /auth/login operator', 200, req('POST', '/auth/login', { body: { email: operatorEmail, password: 'oper123' } }),
    (b) => b.user.role === 'OPERATOR');
  const operatorToken = r.body.token;
  await expectStatus('POST /auth/login password incorrecta', 401, req('POST', '/auth/login', { body: { email: adminEmail, password: 'mal' } }));
  await expectStatus('POST /auth/login email inexistente', 401, req('POST', '/auth/login', { body: { email: `nadie.${TS}@e2e.com`, password: 'x' } }));
  await expectStatus('POST /auth/login email invalido', 400, req('POST', '/auth/login', { body: { email: 'no-es-email', password: 'x' } }));

  // ---------- PERMISOS SOBRE /users ----------
  await expectStatus('GET /users sin token', 401, req('GET', '/users'));
  await expectStatus('GET /users token invalido', 401, req('GET', '/users', { token: 'basura' }));
  await expectStatus('GET /users operator', 403, req('GET', '/users', { token: operatorToken }));
  await expectStatus('GET /users admin', 200, req('GET', '/users', { token: adminToken }),
    (b) => Array.isArray(b) && b.some((u) => u.id === ids.admin) && b.every((u) => u.password === undefined));
  await expectStatus('GET /users/:id admin', 200, req('GET', `/users/${ids.operator}`, { token: adminToken }), (b) => b.email === operatorEmail);
  await expectStatus('GET /users/abc', 400, req('GET', '/users/abc', { token: adminToken }));
  await expectStatus('GET /users/999999', 404, req('GET', '/users/999999', { token: adminToken }));
  await expectStatus('PATCH /users/:id', 200, req('PATCH', `/users/${ids.operator}`, { token: adminToken, body: { name: 'Operator Editado' } }),
    (b) => b.name === 'Operator Editado');
  await expectStatus('PATCH /users/:id body vacio', 400, req('PATCH', `/users/${ids.operator}`, { token: adminToken, body: {} }));

  // ---------- ZONAS ----------
  await expectStatus('POST /zones sin token', 401, req('POST', '/zones', { body: { name: 'Zona X' } }));
  await expectStatus('POST /zones operator', 403, req('POST', '/zones', { token: operatorToken, body: { name: 'Zona X' } }));
  await expectStatus('POST /zones campo viejo nombreZona', 400, req('POST', '/zones', { token: adminToken, body: { nombreZona: 'Centro' } }));
  await expectStatus('POST /zones nombre corto', 400, req('POST', '/zones', { token: adminToken, body: { name: 'A' } }));
  r = await expectStatus('POST /zones', 201, req('POST', '/zones', { token: adminToken, body: { name: `Centro ${TS}` } }), (b) => b.name === `Centro ${TS}`);
  ids.zone1 = r.body.id;
  r = await expectStatus('POST /zones (2)', 201, req('POST', '/zones', { token: adminToken, body: { name: `Norte ${TS}` } }));
  ids.zone2 = r.body.id;
  await expectStatus('GET /zones', 200, req('GET', '/zones'), (b) => b.some((z) => z.id === ids.zone1));
  await expectStatus('GET /zones/:id', 200, req('GET', `/zones/${ids.zone1}`), (b) => b.name === `Centro ${TS}`);
  await expectStatus('GET /zones/999999', 404, req('GET', '/zones/999999'));
  await expectStatus('GET /zones/-1', 400, req('GET', '/zones/-1'));
  await expectStatus('PATCH /zones/:id', 200, req('PATCH', `/zones/${ids.zone1}`, { token: adminToken, body: { name: `Centro Editado ${TS}` } }),
    (b) => b.name === `Centro Editado ${TS}`);
  await expectStatus('PATCH /zones/:id body vacio', 400, req('PATCH', `/zones/${ids.zone1}`, { token: adminToken, body: {} }));
  await expectStatus('PATCH /zones/999999', 404, req('PATCH', '/zones/999999', { token: adminToken, body: { name: 'Nada' } }));

  // ---------- TIPOS ----------
  await expectStatus('POST /property-types sin token', 401, req('POST', '/property-types', { body: { description: 'Casa' } }));
  await expectStatus('POST /property-types operator', 403, req('POST', '/property-types', { token: operatorToken, body: { description: 'Casa' } }));
  await expectStatus('POST /property-types campo viejo descTipo', 400, req('POST', '/property-types', { token: adminToken, body: { descTipo: 'Casa' } }));
  r = await expectStatus('POST /property-types', 201, req('POST', '/property-types', { token: adminToken, body: { description: `Departamento ${TS}` } }),
    (b) => b.description === `Departamento ${TS}`);
  ids.type1 = r.body.id;
  r = await expectStatus('POST /property-types (2)', 201, req('POST', '/property-types', { token: adminToken, body: { description: `Casa ${TS}` } }));
  ids.type2 = r.body.id;
  await expectStatus('GET /property-types', 200, req('GET', '/property-types'), (b) => b.some((t) => t.id === ids.type1));
  await expectStatus('GET /property-types/:id', 200, req('GET', `/property-types/${ids.type1}`));
  await expectStatus('GET /property-types/999999', 404, req('GET', '/property-types/999999'));
  await expectStatus('PATCH /property-types/:id', 200, req('PATCH', `/property-types/${ids.type2}`, { token: adminToken, body: { description: `Casa Editada ${TS}` } }),
    (b) => b.description === `Casa Editada ${TS}`);
  await expectStatus('PATCH /property-types/999999', 404, req('PATCH', '/property-types/999999', { token: adminToken, body: { description: 'Nada' } }));

  // ---------- PROPIEDADES ----------
  await expectStatus('POST /properties sin token', 401, req('POST', '/properties', { body: propertyBody() }));
  r = await expectStatus('POST /properties (SALE, con coords)', 201, req('POST', '/properties', { token: adminToken, body: propertyBody() }),
    (b) => b.operation === 'SALE' && b.zoneId === ids.zone1 && b.propertyTypeId === ids.type1 && b.userId === ids.admin);
  ids.prop1 = r.body.id;
  r = await expectStatus('POST /properties operator (RENT, sin coords)', 201, req('POST', '/properties', {
    token: operatorToken,
    body: propertyBody({ operation: 'RENT', currency: 'ARS', zoneId: ids.zone2, propertyTypeId: ids.type2, userId: ids.operator, latitude: undefined, longitude: undefined })
  }), (b) => b.operation === 'RENT' && b.latitude === null);
  ids.prop2 = r.body.id;
  await expectStatus('POST /properties latitude sin longitude', 400, req('POST', '/properties', { token: adminToken, body: propertyBody({ longitude: undefined }) }));
  await expectStatus('POST /properties operation VENTA', 400, req('POST', '/properties', { token: adminToken, body: propertyBody({ operation: 'VENTA' }) }));
  await expectStatus('POST /properties zoneId inexistente', 400, req('POST', '/properties', { token: adminToken, body: propertyBody({ zoneId: 999999 }) }));
  await expectStatus('POST /properties campos viejos en español', 400, req('POST', '/properties', {
    token: adminToken,
    body: {
      cantHabitaciones: 2, metrosCuadrados: 50, cochera: false, aptoCredito: true, descripcion: 'Vieja',
      operacion: 'VENTA', direccion: 'X 1', moneda: 'ARS', precio: 1, tipoId: ids.type1, zonaId: ids.zone1, usuarioId: ids.admin
    }
  }));

  await expectStatus('GET /properties', 200, req('GET', '/properties'),
    (b) => b.some((p) => p.id === ids.prop1) && b.some((p) => p.id === ids.prop2));
  await expectStatus('GET /properties?zoneId', 200, req('GET', `/properties?zoneId=${ids.zone1}`),
    (b) => b.some((p) => p.id === ids.prop1) && !b.some((p) => p.id === ids.prop2) && b.every((p) => p.zoneId === ids.zone1));
  await expectStatus('GET /properties?propertyTypeId', 200, req('GET', `/properties?propertyTypeId=${ids.type2}`),
    (b) => b.some((p) => p.id === ids.prop2) && b.every((p) => p.propertyTypeId === ids.type2));
  await expectStatus('GET /properties?operation=SALE', 200, req('GET', '/properties?operation=SALE'),
    (b) => b.some((p) => p.id === ids.prop1) && b.every((p) => p.operation === 'SALE'));
  await expectStatus('GET /properties?operation=RENT', 200, req('GET', '/properties?operation=RENT'),
    (b) => b.some((p) => p.id === ids.prop2) && b.every((p) => p.operation === 'RENT'));
  await expectStatus('GET /properties filtros combinados', 200, req('GET', `/properties?zoneId=${ids.zone2}&propertyTypeId=${ids.type2}&operation=RENT`),
    (b) => b.length >= 1 && b.every((p) => p.id !== ids.prop1));
  r = await expectStatus('GET /properties?operation=VENTA (400 o 500)', [400, 500], req('GET', '/properties?operation=VENTA'));
  notes.push(`GET /properties?operation=VENTA devolvio ${r.status}: ${JSON.stringify(r.body)}`);
  await expectStatus('GET /properties/:id con relaciones', 200, req('GET', `/properties/${ids.prop1}`),
    (b) => b.propertyType.id === ids.type1 && b.zone.id === ids.zone1 && Array.isArray(b.photos) && b.latitude !== null);
  await expectStatus('GET /properties/999999', 404, req('GET', '/properties/999999'));
  await expectStatus('PATCH /properties/:id', 200, req('PATCH', `/properties/${ids.prop1}`, { token: adminToken, body: { price: 99999 } }),
    (b) => Number(b.price) === 99999);
  await expectStatus('PATCH /properties/:id body vacio', 400, req('PATCH', `/properties/${ids.prop1}`, { token: adminToken, body: {} }));
  await expectStatus('PATCH /properties/:id zoneId inexistente', 400, req('PATCH', `/properties/${ids.prop1}`, { token: adminToken, body: { zoneId: 999999 } }));
  await expectStatus('PATCH /properties/999999', 404, req('PATCH', '/properties/999999', { token: adminToken, body: { price: 1 } }));
  await expectStatus('PATCH /properties sin token', 401, req('PATCH', `/properties/${ids.prop1}`, { body: { price: 1 } }));

  // ---------- FOTOS ----------
  await expectStatus('POST /photos sin token', 401, req('POST', '/photos', { form: photoForm(ids.prop1) }));
  await expectStatus('POST /photos sin archivo', 400, req('POST', '/photos', { token: adminToken, form: photoForm(ids.prop1, { field: null }) }));
  await expectStatus('POST /photos campo viejo "imagen"', 400, req('POST', '/photos', { token: adminToken, form: photoForm(ids.prop1, { field: 'imagen' }) }));
  await expectStatus('POST /photos formato no permitido', 400, req('POST', '/photos', {
    token: adminToken, form: photoForm(ids.prop1, { type: 'text/plain', filename: 'x.txt', content: Buffer.from('hola') })
  }));
  await expectStatus('POST /photos propertyId inexistente', 404, req('POST', '/photos', { token: adminToken, form: photoForm(999999) }));
  r = await expectStatus('POST /photos', 201, req('POST', '/photos', { token: adminToken, form: photoForm(ids.prop1) }),
    (b) => b.propertyId === ids.prop1 && b.url.startsWith('/uploads/'));
  ids.photo1 = r.body.id;
  const photoUrl = r.body.url;
  if (photoUrl) await expectStatus('GET archivo subido', 200, req('GET', photoUrl));
  await expectStatus('GET /photos?propertyId', 200, req('GET', `/photos?propertyId=${ids.prop1}`),
    (b) => b.some((p) => p.id === ids.photo1) && b.every((p) => p.propertyId === ids.prop1));
  await expectStatus('GET /photos/:id', 200, req('GET', `/photos/${ids.photo1}`));
  await expectStatus('GET /properties/:id incluye photos', 200, req('GET', `/properties/${ids.prop1}`),
    (b) => b.photos.some((p) => p.id === ids.photo1));
  await expectStatus('DELETE /photos/:id', 200, req('DELETE', `/photos/${ids.photo1}`, { token: adminToken }));
  await expectStatus('GET /photos/:id borrada', 404, req('GET', `/photos/${ids.photo1}`));
  if (photoUrl) await expectStatus('GET archivo borrado del disco', 404, req('GET', photoUrl));
  await expectStatus('DELETE /photos/999999', 404, req('DELETE', '/photos/999999', { token: adminToken }));

  // ---------- CONSULTAS ----------
  const inquiryBody = { name: 'Visitante', email: `visitante.${TS}@e2e.com`, message: 'Me interesa', propertyId: ids.prop1 };
  r = await expectStatus('POST /inquiries publico', 201, req('POST', '/inquiries', { body: inquiryBody }),
    (b) => b.propertyId === ids.prop1 && b.message === 'Me interesa' && typeof b.createdAt === 'string');
  ids.inquiry1 = r.body.id;
  await expectStatus('POST /inquiries campos viejos (nombre, mensaje)', 400, req('POST', '/inquiries', {
    body: { nombre: 'X', email: `y.${TS}@e2e.com`, mensaje: 'hola', propiedadId: ids.prop1 }
  }));
  await expectStatus('POST /inquiries propertyId inexistente', 404, req('POST', '/inquiries', { body: { ...inquiryBody, propertyId: 999999 } }));
  await expectStatus('POST /inquiries email invalido', 400, req('POST', '/inquiries', { body: { ...inquiryBody, email: 'nope' } }));
  await expectStatus('GET /inquiries sin token', 401, req('GET', '/inquiries'));
  await expectStatus('GET /inquiries', 200, req('GET', '/inquiries', { token: operatorToken }), (b) => b.some((i) => i.id === ids.inquiry1));
  await expectStatus('GET /inquiries/:id', 200, req('GET', `/inquiries/${ids.inquiry1}`, { token: adminToken }), (b) => b.name === 'Visitante');
  await expectStatus('GET /inquiries/999999', 404, req('GET', '/inquiries/999999', { token: adminToken }));
  await expectStatus('PATCH /inquiries/:id', 200, req('PATCH', `/inquiries/${ids.inquiry1}`, { token: adminToken, body: { message: 'Editado' } }),
    (b) => b.message === 'Editado');
  await expectStatus('PATCH /inquiries/:id sin token', 401, req('PATCH', `/inquiries/${ids.inquiry1}`, { body: { message: 'x' } }));
  await expectStatus('DELETE /inquiries/:id', 200, req('DELETE', `/inquiries/${ids.inquiry1}`, { token: adminToken }));
  await expectStatus('DELETE /inquiries/:id otra vez', 404, req('DELETE', `/inquiries/${ids.inquiry1}`, { token: adminToken }));

  // ---------- RESTRICCIONES Y CASCADA ----------
  await expectStatus('DELETE /zones con propiedades', 409, req('DELETE', `/zones/${ids.zone1}`, { token: adminToken }));
  await expectStatus('DELETE /property-types con propiedades', 409, req('DELETE', `/property-types/${ids.type1}`, { token: adminToken }));
  await expectStatus('DELETE /users con propiedades', 409, req('DELETE', `/users/${ids.admin}`, { token: adminToken }));
  await expectStatus('DELETE /zones operator', 403, req('DELETE', `/zones/${ids.zone2}`, { token: operatorToken }));

  r = await expectStatus('POST /photos (para cascada)', 201, req('POST', '/photos', { token: adminToken, form: photoForm(ids.prop2) }));
  ids.photo2 = r.body.id;
  r = await expectStatus('POST /inquiries (para cascada)', 201, req('POST', '/inquiries', { body: { ...inquiryBody, propertyId: ids.prop2 } }));
  ids.inquiry2 = r.body.id;
  await expectStatus('DELETE /properties/:id (prop2)', 200, req('DELETE', `/properties/${ids.prop2}`, { token: operatorToken }));
  await expectStatus('Cascada: foto de prop2 borrada', 404, req('GET', `/photos/${ids.photo2}`));
  await expectStatus('Cascada: consulta de prop2 borrada', 404, req('GET', `/inquiries/${ids.inquiry2}`, { token: adminToken }));
  await expectStatus('DELETE /properties/999999', 404, req('DELETE', '/properties/999999', { token: adminToken }));

  // ---------- LIMPIEZA ----------
  await expectStatus('Limpieza: DELETE prop1', 200, req('DELETE', `/properties/${ids.prop1}`, { token: adminToken }));
  for (const key of ['zone1', 'zone2']) {
    await expectStatus(`Limpieza: DELETE ${key}`, 200, req('DELETE', `/zones/${ids[key]}`, { token: adminToken }));
  }
  for (const key of ['type1', 'type2']) {
    await expectStatus(`Limpieza: DELETE ${key}`, 200, req('DELETE', `/property-types/${ids[key]}`, { token: adminToken }));
  }
  await expectStatus('Limpieza: DELETE operator', 200, req('DELETE', `/users/${ids.operator}`, { token: adminToken }));
  await expectStatus('Limpieza: DELETE admin', 200, req('DELETE', `/users/${ids.admin}`, { token: adminToken }));
  await expectStatus('Limpieza: GET /users/:id admin borrado', 404, req('GET', `/users/${ids.admin}`, { token: adminToken }));
}

main()
  .catch((error) => {
    console.error('\nError inesperado en el script:', error);
    results.push({ test: 'script', esperado: '-', obtenido: 'excepcion', ok: 'FALLA' });
  })
  .finally(() => {
    console.log('\n===== RESULTADOS =====');
    console.table(results);
    const failed = results.filter((r) => r.ok !== 'OK').length;
    if (notes.length) {
      console.log('\nNotas:');
      notes.forEach((n) => console.log(`- ${n}`));
    }
    console.log(`\nTotal: ${results.length} | OK: ${results.length - failed} | Fallas: ${failed}`);
    process.exitCode = failed ? 1 : 0;
  });
