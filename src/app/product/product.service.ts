import { inject, Injectable } from '@angular/core';
import { Page, PageOption, Product, Response } from './product';
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
      direction: 'ASC'
    };
    return this.http.get<Response<Product[]>>(this.url, { params: {...pageResult} });
  }
}
