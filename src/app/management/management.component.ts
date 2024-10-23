import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductListComponent } from "../product/product-list/product-list.component";

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [MatTabsModule, ProductListComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent {

}
