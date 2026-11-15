const BASE_URL = 'http://localhost:3000'; // Ajusta el puerto de tu JSON Server o backend

export const obtenerCatalogo = async () => {
  const response = await fetch(`${BASE_URL}/libros`);
  if (!response.ok) {
    throw new Error(`Error al cargar el catálogo (Código: ${response.status})`);
  }
  return await response.json();
};

export const obtenerDetalleLibro = async (id) => {
  const response = await fetch(`${BASE_URL}/libros/${id}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener el detalle del libro (Código: ${response.status})`);
  }
  return await response.json();
};
