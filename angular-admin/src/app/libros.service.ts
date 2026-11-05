import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from './libro';

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/libros';

  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }
}
