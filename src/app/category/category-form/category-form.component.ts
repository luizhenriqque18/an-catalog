import { AsyncPipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../category';

@Component({
  selector: 'app-category-form',
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
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  private service = inject(CategoryService);
  
  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ){}

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
  });
  
  ngAfterViewInit(): void {
    if (this.data) {
      this.form.setValue({
        id: this.data.id.toString(),
        name: this.data.name
      })
    }
  }



  handleCloseDialog() {
    this.dialogRef.close(this.form.value);
  }
}
