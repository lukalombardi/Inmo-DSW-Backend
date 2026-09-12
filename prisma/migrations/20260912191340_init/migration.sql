-- CreateTable
CREATE TABLE `zonas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreZona` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descTipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'OPERADOR') NOT NULL DEFAULT 'OPERADOR',

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propiedades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantHabitaciones` INTEGER NOT NULL,
    `metrosCuadrados` DECIMAL(10, 2) NOT NULL,
    `cochera` BOOLEAN NOT NULL,
    `aptoCredito` BOOLEAN NOT NULL,
    `descripcion` TEXT NOT NULL,
    `operacion` ENUM('VENTA', 'ALQUILER') NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `latitud` DECIMAL(10, 7) NOT NULL,
    `longitud` DECIMAL(10, 7) NOT NULL,
    `moneda` ENUM('ARS', 'USD') NOT NULL,
    `precio` DECIMAL(12, 2) NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `zonaId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `propiedadId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mensaje` TEXT NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `propiedadId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_zonaId_fkey` FOREIGN KEY (`zonaId`) REFERENCES `zonas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_propiedadId_fkey` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_propiedadId_fkey` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
