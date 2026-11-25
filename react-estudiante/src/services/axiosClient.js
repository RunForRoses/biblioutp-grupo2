import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let mensajeUsuario = 'Ocurrió un error inesperado de conexión.';
    
    if (error.response) {
      const { status } = error.response;
      if (status === 400) mensajeUsuario = 'Datos de préstamo inválidos. Verifica la información.';
      else if (status === 404) mensajeUsuario = 'El recurso o reserva no fue encontrado.';
      else if (status === 409) mensajeUsuario = 'Este libro ya tiene un prestano activo.';
      else if (status >= 500) mensajeUsuario = 'Error interno del servidor. Intenta más tarde.';
    }
    
    return Promise.reject(new Error(mensajeUsuario));
  }
);

export default axiosClient;
