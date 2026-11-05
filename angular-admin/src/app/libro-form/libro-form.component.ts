import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Libro } from '../libro';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.css',
})
export class LibroFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly estados = ['disponible', 'agotado', 'mantenimiento'] as const;
  readonly formatosDisponibles = ['Físico', 'E-book', 'Audiolibro'] as const;
  enviado = false;

  readonly formulario = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    sede: ['', [Validators.required, Validators.maxLength(80)]],
    capacidad: [1, [Validators.required, Validators.min(1), Validators.max(60)]],
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

  guardar(): void {
    this.enviado = true;
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos: Omit<Libro, 'id'> = this.formulario.getRawValue();
    // Propuesta: aquí el componente padre/servicio recibiría `datos` para crear el libro.
    console.log('Libro listo para guardar:', datos);
  }
}
