import { inject, Injectable } from '@angular/core';
import { Direction, Page, PageOption, Product, Response } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API = `product`;
  private readonly url = `http://localhost:8080/${this.API}`;
  private http = inject(HttpClient);

  loadPage(page: PageOption): Observable<Response<Product[]>> {
    const pageResult = {
      page: String(page.page - 1),
      size: page.size,
      sort: 'id',
      direction: Direction.DESC,
    };
    return this.http.get<Response<Product[]>>(this.url, {
      params: { ...pageResult },
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  create(item: Product): Observable<string> {
    return this.http.post<string>(`${this.url}`, { ...item }, {
      responseType: 'text' as 'json'
    });
  }

  update(item: Product): Observable<string> {
    return this.http.patch<string>(`${this.url}/${item.id}`, { ...item }, {
      responseType: 'text' as 'json'
    });
  }
}
