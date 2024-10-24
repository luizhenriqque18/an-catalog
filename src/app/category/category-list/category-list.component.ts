import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category, CategoryForm } from '../category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Direction, Page, PageOption } from 'src/app/product/product';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'name', 'action'];
  private service = inject(CategoryService);
  private _snackBar = inject(MatSnackBar);
  public dataSource = new MatTableDataSource<Category>();
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
    this.service.loadPage(pageOption).subscribe((resp) => {
      this.dataSource.data = resp.data;
      this.paginatorResult = resp.pagination;
    });
  }

  delete(item: Category) {
    this.service.delete(item.id.toString()).subscribe(
      (rest) => {
        console.log('rest', rest);
      },
      (err) => {
        this._snackBar.open(err.error, 'Ok', { duration: 5000 });
      },
      () => {
        this.handlePage({
          size: this.paginatorResult.pageSize,
          page: this.paginatorResult.page + 1,
          sort: 'id',
          direction: Direction.ASC,
        });
      }
    );
  }

  new() {
    this.handlerOpenDialog().subscribe(
      (result: CategoryForm) => {
        if (result !== undefined) {
          this.service.create(result).subscribe((r) => {
            this.relaodCategoryAll();
          });
        }
      },
      (err) => {
        this._snackBar.open(err.error, 'Ok', { duration: 5000 });
      }
    );
  }

  edit(item: Category) {
    this.handlerOpenDialog(item).subscribe(
      (result: CategoryForm) => {
        if (result !== undefined) {
          this.service.update(result).subscribe((r) => {
            this.relaodCategoryAll();
          });
        }
      },
      (err) => {
        this._snackBar.open(err.error, 'Ok', { duration: 5000 });
      }
    );
  }

  relaodCategoryAll() {
    this.handlePage({
      size: this.paginatorResult.pageSize,
      page: this.paginatorResult.page + 1,
      sort: 'id',
      direction: Direction.DESC,
    });
  }

  handlerOpenDialog(item?: Category) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: item,
    });
    return dialogRef.afterClosed();
  }
}
