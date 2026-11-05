import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { LibrosService } from './libros.service';
import { Libro } from './libro';

@Component({
  imports: [RouterLink, RouterOutlet, NgClass],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly librosService = inject(LibrosService);
  libros: Libro[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.librosService.listar().subscribe({
      next: (libros) => {
        this.libros = libros;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el catálogo. Verifica que api-mock esté activo.';
        this.cargando = false;
      },
    });
  }
}
