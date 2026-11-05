import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LibrosService } from '../libros.service';
import { Router } from '@angular/router';
import { Libro } from '../libro';
import { TitleCasePipe } from '@angular/common';
import { validadorSedeRegex } from '../validadores/validadores';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.css',
})
export class LibroFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly librosService = inject(LibrosService);
  private readonly router = inject(Router);
  readonly estados = ['disponible', 'agotado'] as const;
  readonly formatosDisponibles = ['Físico', 'E-book', 'Audiolibro'] as const;
  enviado = false;

  private enteroPositivo(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;

    if (valor === null || valor === '') return null;

    return Number.isInteger(Number(valor)) ? null : { entero: true };
  }

  readonly formulario = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    sede: ['', [Validators.required, Validators.maxLength(80), validadorSedeRegex()]],
    capacidad: [1, [Validators.required, Validators.min(1), Validators.max(60), this.enteroPositivo]],
    formatos: this.formBuilder.nonNullable.array<string>([], Validators.required),
    estado: ['disponible' as (typeof this.estados)[number], Validators.required],
  });

  get formatos(): FormArray {
    return this.formulario.controls.formatos;
  }

  tieneFormato(formato: string): boolean {
    return this.formatos.controls.some((control) => control.value === formato);
  }

  alternarFormato(formato: string, marcado: boolean): void {
    if (marcado && !this.tieneFormato(formato)) {
      this.formatos.push(this.formBuilder.nonNullable.control(formato));
    } else if (!marcado) {
      const indice = this.formatos.controls.findIndex((control) => control.value === formato);
      if (indice >= 0) this.formatos.removeAt(indice);
    }
    this.formatos.markAsTouched();
  }

  limpiar(): void {
    this.formatos.clear();
    this.formulario.reset({
      nombre: '',
      sede: '',
      capacidad: 1,
      estado: 'disponible',
    });
    this.enviado = false;
  }
  guardar(): void {
    this.enviado = true;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos: Omit<Libro, 'id'> = this.formulario.getRawValue();

    this.librosService.crear(datos).subscribe({
      next: () => {
        alert('Libro registrado correctamente.');
        this.router.navigateByUrl('/libros');
      },
      error: (error) => {
        console.error('Error al guardar el libro:', error);
        alert('No se pudo guardar. Verifica que api-mock esté corriendo.');
      },
    });
  }
}
