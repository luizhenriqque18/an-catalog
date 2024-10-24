import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Direction, PageOption, Product, Response } from '../product/product';
import { Observable } from 'rxjs';
import { Category } from './category';

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

  loadPage(page: PageOption): Observable<Response<Category[]>> {
    const pageResult = {
      page: String(page.page - 1),
      size: page.size,
      sort: 'id',
      direction: Direction.DESC,
    };
    return this.http.get<Response<Category[]>>(this.url, {
      params: { ...pageResult },
    });
  }

  create(item: Category): Observable<string> {
    return this.http.post<string>(`${this.url}`, { ...item }, {
      responseType: 'text' as 'json'
    });
  }

  update(item: Category): Observable<string> {
    return this.http.patch<string>(`${this.url}/${item.id}`, { ...item }, {
      responseType: 'text' as 'json'
    });
  }
}
