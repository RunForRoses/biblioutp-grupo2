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
        return '🟢 Disponible';
      case 'agotado':
        return '🔴 Agotado';
      case 'aprobada':
        return '✅ Aprobada';
      case 'pendiente':
        return '⏳ Pendiente';
      case 'rechazada':
        return '❌ Rechazada';
      default:
        return valor.charAt(0).toUpperCase() + valor.slice(1);
    }
  }
}
