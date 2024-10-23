import {
  AfterViewInit,
  Component,
  inject,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product, PageOption, Page, Direction } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'description'];
  private service = inject(ProductService);
  public dataSource = new MatTableDataSource<Product>();
  paginatorResult: Page = {
    page: 0,
    pageSize: 5,
    totalElements: 0,
    totalPages: 0,
  }
  pageSizeOptions = [5, 10];

  ngAfterViewInit() {
    this.handlePage({
      size: this.paginatorResult.pageSize,
      page: this.paginatorResult.page + 1,
      sort: 'id',
      direction: Direction.ASC,
    })
  }

  handlePageEvent($event: PageEvent) {
    this.handlePage({
      size: $event.pageSize,
      page: $event.pageIndex + 1,
      sort: 'id',
      direction: Direction.ASC,
    })
  }

  handlePage(pageOption: PageOption) {
    this.service.loadPage(pageOption).subscribe((products) => {
      this.dataSource.data = products.data;
      this.paginatorResult = products.pagination;
    });
  }
}