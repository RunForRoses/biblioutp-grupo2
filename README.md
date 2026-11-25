# BiblioUTP - Sistema de Préstamos Bibliotecarios

**Curso:** JavaScript Avanzado

**Grupo:** Grupo 2  

**Integrantes:**
- Omar Sebastián Huaches
- Josef Chavez Bernuy
- Bryan Mendoza Cahuana


## Dominio del Proyecto
- **Catálogo:** Libros (id, nombre, sede, capacidad, formatos, estado)
- **Transacción:** Préstamos (id, codigo, libroId, usuarioId, fecha, horaInicio, horaFin, motivo, estado, creadoEn)
- **Regla de negocio mínima:** Máximo 3 préstamos activos simultáneos por usuario y sin colisión de franja horaria.

---

## Cómo ejecutar cada módulo

1. **Núcleo JS (core-js):**

   cd core-js | npm test

2. **API Simulada (api-mock):**

   cd api-mock | npm run api

3. **Panel Administrador (angular-admin):**

   cd angular-admin | ng serve

4. **Portal del Estudiante (react-estudiante):**

   cd react-estudiante | npm run dev


---

## Comparativa: Fetch vs Axios vs Alova

| Aspecto | Fetch API (catalogoFetch.js) | Axios (axiosClient.js) | Alova (alovaClient.js) |
| :--- | :--- | :--- | :--- |
| **¿Para qué lo usamos?** | Traer la lista de libros del catálogo y ver el detalle de un libro. | Listar los préstamos del alumno, crear uno nuevo y cancelar los pendientes. | Mostrar el resumen de préstamos por estado (aprobados, pendientes, rechazados). |
| **Ventaja principal** | Ya viene en el navegador (no se instala nada) y es ideal para consultas simples de lectura. | Usa una dirección base única y convierte errores técnicos en mensajes claros para el alumno. | Guarda los datos en caché por 1 minuto para no repetir consultas, y maneja el estado de carga y actualización. |
| **¿Cómo maneja los errores?** | Se verifica manualmente en cada consulta si la respuesta salió bien. | Tiene un filtro central (interceptor) que traduce automáticamente códigos como 404 o 409 a mensajes amigables. | Revisa la respuesta en un solo lugar al recibirla y avisa si hubo algún problema. |
