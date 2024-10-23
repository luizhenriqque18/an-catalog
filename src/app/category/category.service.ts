import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, Product, Response } from '../product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  private readonly API = `category`;
  private readonly url = `http://localhost:8080/${this.API}`;
  private http = inject(HttpClient);

  loadAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/all`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
