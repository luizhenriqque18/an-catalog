import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductListComponent } from "../product/product-list/product-list.component";
import { CategoryListComponent } from "../category/category-list/category-list.component";

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [MatTabsModule, ProductListComponent, CategoryListComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent {

}
