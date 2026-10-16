const { z } = require('zod');

const propertyBase = z.object({

rooms: z
    .coerce.number( {message: 'la cantidad de habitaciones debe ser un numero'})
    .nonnegative({message: 'la cantidad de habitaciones no debe ser menor a 0'})   
    .int({message: 'la cantidad de habitaciones debe ser un numero entero'})
,
squareMeters: z
    .coerce.number( {message: 'la cantidad de metros cuadrados debe ser un numero'})
    .positive({message: 'la cantidad de metros cuadrados debe ser mayor a 0'})   
,
garage: z
    .boolean( {message: 'la cochera debe ser verdadero o falso'})  
,
creditEligible: z
    .boolean( {message: 'la aptitud crediticia debe ser verdadero o falso'}) 
,
description: z
    .string({ message: 'La descripción debe ser un texto' })
    .trim()
    .min(2, 'La descripción debe tener al menos 2 caracteres')
    .max(256, 'La descripción no puede superar los 256 caracteres')
,
operation: z
    .enum(['SALE','RENT'])
,
address: z
    .string({ message: 'La direccion debe ser un texto' })
    .trim()
    .min(2, 'La direccion debe tener al menos 2 caracteres')
    .max(191, 'La direccion no puede superar los 191 caracteres')
,
latitude: z
    .coerce.number()
    .min(-90, 'La latitud debe ser mayor o igual a -90')
    .max(90, 'La latitud debe ser menor o igual a 90')
    .optional()
,
longitude: z
    .coerce.number()
    .min(-180, 'La longitud debe ser mayor o igual a -180')
    .max(180, 'La longitud debe ser menor o igual a 180')
    .optional()
,
currency: z
    .enum(['ARS','USD'])
,
price: z
    .coerce.number( {message: 'el precio debe ser un numero'})
    .positive({message: 'el precio debe ser mayor a 0'})   
,
propertyTypeId: z
    .coerce.number()
    .int()
    .positive()
,
zoneId: z
    .coerce.number()
    .int()
    .positive()
,
userId: z
    .coerce.number()
    .int()
    .positive()
});



const coordinatesInPair = (data) =>
    (data.latitude === undefined) === (data.longitude === undefined);

const pairMessage = {
    message: 'Latitud y longitud deben enviarse juntas',
    path: ['latitude']
};

const propertySchema = propertyBase.refine(coordinatesInPair, pairMessage);

const propertyUpdateSchema = propertyBase
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
    });

module.exports = { propertySchema, propertyUpdateSchema };
