import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:3000',
  statesHook: ReactHook,
  requestAdapter: adapterFetch(),
  responded: async (response) => {
    if (!response.ok) throw new Error('Error al obtener el resumen');
    return response.json();
  },
});

export const getResumenEstudiante = (usuarioId) =>
  alovaInstance.Get(`/reservas?usuarioId=${usuarioId}`, {
    name: `resumen-${usuarioId}`,
    cacheFor: 60 * 1000, // Caché activo por 1 minuto
  });
