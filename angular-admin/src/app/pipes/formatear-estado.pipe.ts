import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearEstado',
  standalone: true,
})
export class FormatearEstadoPipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor) return 'Desconocido';

    const estado = valor.toLowerCase().trim();
    switch (estado) {
      case 'disponible':
        return '🟢\u00A0Disponible';
      case 'agotado':
        return '🔴\u00A0Agotado';
      case 'aprobada':
        return '✅\u00A0Aprobada';
      case 'pendiente':
        return '⏳\u00A0Pendiente';
      case 'rechazada':
        return '❌\u00A0Rechazada';
      case 'devuelto':
        return '🔵\u00A0Devuelto';
      default:
        return valor.charAt(0).toUpperCase() + valor.slice(1);
    }
  }
}
