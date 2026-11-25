import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamosService } from '../prestamos.service';
import { Prestamo } from '../prestamo';
import { FormatearEstadoPipe } from '../pipes/formatear-estado.pipe';

@Component({
  selector: 'app-prestamos-lista',
  standalone: true,
  imports: [NgClass, FormsModule, FormatearEstadoPipe],
  templateUrl: './prestamos-lista.html',
  styleUrl: './prestamos-lista.css',
})
export class PrestamosListaComponent implements OnInit, OnDestroy {
  private readonly prestamosService = inject(PrestamosService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly platformId = inject(PLATFORM_ID);
  private intervaloId: ReturnType<typeof setInterval> | null = null;

  prestamos: Prestamo[] = [];
  busqueda = '';
  cargando = true;
  error = '';

  get prestamosFiltrados(): Prestamo[] {
    const termino = this.busqueda.trim().toLowerCase();
    if (!termino) return this.prestamos;
    return this.prestamos.filter(
      (p) =>
        p.codigo.toLowerCase().includes(termino) ||
        (p.nombreUsuario || '').toLowerCase().includes(termino) ||
        `usuario #${p.usuarioId}`.includes(termino)
    );
  }

  ngOnInit(): void {
    this.cargarPrestamos(false);
    if (isPlatformBrowser(this.platformId)) {
      this.intervaloId = setInterval(() => this.cargarPrestamos(true), 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }

  cargarPrestamos(silencioso = false): void {
    if (!silencioso) this.cargando = true;
    this.prestamosService.listar().subscribe({
      next: (datos) => {
        this.prestamos = datos;
        this.cargando = false;
        this.error = '';
        this.cdr.detectChanges();
      },
      error: () => {
        if (!silencioso) {
          this.error = 'No se pudieron cargar los préstamos. Verifica que api-mock esté activo.';
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  actualizarEstado(prestamo: Prestamo, nuevoEstado: 'aprobada' | 'rechazada' | 'devuelto'): void {
    this.prestamosService.cambiarEstado(prestamo.id, nuevoEstado).subscribe({
      next: (actualizado) => {
        prestamo.estado = actualizado.estado;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = `No se pudo actualizar el préstamo ${prestamo.codigo}.`;
        this.cdr.detectChanges();
      },
    });
  }
}
