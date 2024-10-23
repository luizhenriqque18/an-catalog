import { AfterViewInit, Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../category.service';
import { Product } from '../product';
import { AsyncPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    AsyncPipe
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements AfterViewInit {
  private service = inject(CategoryService);
  categories$ = this.service.loadAll();
  
  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ){}
  
  ngAfterViewInit(): void {
    if (this.data) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
        price: this.data.price,
        category: this.data.categoryResponse.id,
      })
      console.log(this.data);
    }
  }

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(500),
    ]),
    category: new FormControl(0, [Validators.required]),
  });

  handleCloseDialog() {
    this.dialogRef.close(this.form.value);
  }
}
