"Necesito desarrollar pruebas end-to-end con Cypress para la aplicación de gestión de candidatos del proyecto AI4Devs-qa-codesa. Las pruebas deben centrarse en la interfaz 'position' que implementa un sistema Kanban para el seguimiento de candidatos.
Las pruebas deben verificar:

La correcta visualización de la interfaz 'position', confirmando:

La presencia del título de la posición
La visualización de las columnas correspondientes al flujo de contratación (Applied, Screening, Interview, Offer, Hired)
La ubicación adecuada de las tarjetas de candidatos según su fase actual


La funcionalidad de cambio de fase mediante drag-and-drop:

Capacidad para arrastrar candidatos entre diferentes columnas
Correcta actualización visual tras el movimiento
Verificación de la llamada al endpoint PUT /candidate/ con los datos actualizados