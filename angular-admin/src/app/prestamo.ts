export interface Prestamo {
  id: number;
  codigo: string;
  libroId: number;
  usuarioId: number;
  libro?: string;
  nombreUsuario?: string;
  formato?: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'devuelto';
  creadoEn: string;
}