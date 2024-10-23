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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];
  private service = inject(ProductService);
  public dataSource = new MatTableDataSource<Product>();
  paginatorResult: Page = {
    page: 0,
    pageSize: 5,
    totalElements: 0,
    totalPages: 0,
  };
  pageSizeOptions = [5, 10];

  ngAfterViewInit() {
    this.handlePage({
      size: this.paginatorResult.pageSize,
      page: this.paginatorResult.page + 1,
      sort: 'id',
      direction: Direction.ASC,
    });
  }

  handlePageEvent($event: PageEvent) {
    this.handlePage({
      size: $event.pageSize,
      page: $event.pageIndex + 1,
      sort: 'id',
      direction: Direction.ASC,
    });
  }

  handlePage(pageOption: PageOption) {
    this.service.loadPage(pageOption).subscribe((products) => {
      this.dataSource.data = products.data;
      this.paginatorResult = products.pagination;
    });
  }

  delete(item: Product) {
    this.service.delete(item.id).subscribe(
      ()=> {},
      ()=> {},
      ()=> {
        this.handlePage({
          size: this.paginatorResult.pageSize,
          page: this.paginatorResult.page + 1,
          sort: 'id',
          direction: Direction.ASC,
        })
      }
    );
  }

  edit(item: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado', result);
    });
  }
}
