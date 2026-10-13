const { z } = require('zod');

const propiedadBase = z.object({

cantHabitaciones: z
    .coerce.number( {message: 'la cantidad de habitaciones debe ser un numero'})
    .nonnegative({message: 'la cantidad de habitaciones no debe ser menor a 0'})   
    .int({message: 'la cantidad de habitaciones debe ser un numero entero'})
,
metrosCuadrados: z
    .coerce.number( {message: 'la cantidad de metros cuadrados debe ser un numero'})
    .positive({message: 'la cantidad de metros cuadrados debe ser mayor a 0'})   
,
cochera: z
    .boolean( {message: 'la cochera debe ser verdadero o falso'})  
,
aptoCredito: z
    .boolean( {message: 'la aptitud crediticia debe ser verdadero o falso'}) 
,
descripcion: z
    .string({ message: 'La descripción debe ser un texto' })
    .trim()
    .min(2, 'La descripción debe tener al menos 2 caracteres')
    .max(256, 'La descripción no puede superar los 256 caracteres')
,
operacion: z
    .enum(['VENTA','ALQUILER'])
,
direccion: z
    .string({ message: 'La direccion debe ser un texto' })
    .trim()
    .min(2, 'La direccion debe tener al menos 2 caracteres')
    .max(191, 'La direccion no puede superar los 191 caracteres')
,
latitud: z
    .coerce.number()
    .min(-90, 'La latitud debe ser mayor o igual a -90')
    .max(90, 'La latitud debe ser menor o igual a 90')
    .optional()
,
longitud: z
    .coerce.number()
    .min(-180, 'La longitud debe ser mayor o igual a -180')
    .max(180, 'La longitud debe ser menor o igual a 180')
    .optional()
,
moneda: z
    .enum(['ARS','USD'])
,
precio: z
    .coerce.number( {message: 'el precio debe ser un numero'})
    .positive({message: 'el precio debe ser mayor a 0'})   
,
tipoId: z
    .coerce.number()
    .int()
    .positive()
,
zonaId: z
    .coerce.number()
    .int()
    .positive()
,
usuarioId: z
    .coerce.number()
    .int()
    .positive()
});


// latitud y longitud son opcionales (el punto en el mapa), pero si se manda una
// se deben mandar las dos: una coordenada sola no ubica nada.
const coordenadasEnPar = (data) =>
    (data.latitud === undefined) === (data.longitud === undefined);

const mensajePar = {
    message: 'Latitud y longitud deben enviarse juntas',
    path: ['latitud']
};

const propiedadSchema = propiedadBase.refine(coordenadasEnPar, mensajePar);

const propiedadUpdateSchema = propiedadBase
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
    });

module.exports = { propiedadSchema, propiedadUpdateSchema };
