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

5. **Kiosko de Disponibilidad (vue-kiosko):**

   cd vue-kiosko | npm run dev

6. **Portal Público SSR (next-publico):**

   cd next-publico | npm run dev


---

## Comparativa: Fetch vs Axios vs Alova

| Aspecto | Fetch API (catalogoFetch.js) | Axios (axiosClient.js) | Alova (alovaClient.js) |
| :--- | :--- | :--- | :--- |
| **¿Para qué lo usamos?** | Traer la lista de libros del catálogo y ver el detalle de un libro. | Listar los préstamos del alumno, crear uno nuevo y cancelar los pendientes. | Mostrar el resumen de préstamos por estado (aprobados, pendientes, rechazados). |
| **Ventaja principal** | Ya viene en el navegador (no se instala nada) y es ideal para consultas simples de lectura. | Usa una dirección base única y convierte errores técnicos en mensajes claros para el alumno. | Guarda los datos en caché por 1 minuto para no repetir consultas, y maneja el estado de carga y actualización. |
| **¿Cómo maneja los errores?** | Se verifica manualmente en cada consulta si la respuesta salió bien. | Tiene un filtro central (interceptor) que traduce automáticamente códigos como 404 o 409 a mensajes amigables. | Revisa la respuesta en un solo lugar al recibirla y avisa si hubo algún problema. |

---

## Comparativa de Frameworks (Avance 4): Angular vs React vs Vue vs Next.js

| Aspecto | Angular (angular-admin) | React (react-estudiante) | Vue (vue-kiosko) | Next.js (next-publico) |
| :--- | :--- | :--- | :--- | :--- |
| **¿Qué tan fácil es aprenderlo?** | Más difícil al inicio porque exige TypeScript y reglas estrictas. | Intermedio: a algunos integrantes se les hizo fácil por usar JavaScript normal, mientras que a otros se les complicó combinar HTML dentro de JavaScript (JSX) y agregar librerías aparte. | Muy fácil y ordenado: junta lógica, HTML y diseño en un solo archivo. | Intermedio: parte de React, pero debes distinguir qué va en el servidor y qué en el navegador. |
| **¿Cómo maneja los datos?** | Usa servicios compartidos que avisan a la pantalla cuando algo cambia. | Usa hooks (useState, useContext) para guardar datos en cada pantalla. | Muy directo: creas variables reactivas y los filtros se conectan solos (v-model). | Casi no guarda datos porque el servidor los pide frescos cada vez que abres la página. |
| **¿Cómo maneja las rutas?** | Con una lista central de rutas (app.routes.ts). | Instalando react-router-dom para definir rutas y proteger las privadas. | No usamos rutas porque el kiosko es una sola pantalla. | Automático: cada carpeta que creas dentro de app/ se convierte en una ruta. |
| **¿Dónde se dibuja la página?** | En el navegador del usuario. | En el navegador: llega casi vacía y luego carga los datos. | En el navegador, refrescándose sola cada 30 segundos. | **En el servidor (SSR):** la página ya llega lista con todos los datos (ideal para buscadores). |
