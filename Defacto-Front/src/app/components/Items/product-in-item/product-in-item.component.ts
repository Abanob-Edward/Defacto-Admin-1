import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../services/item.service';
import { FormsModule } from '@angular/forms';
import { ApiProductsService } from '../../../services/api-products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-in-item',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-in-item.component.html',
  styleUrl: './product-in-item.component.css'
})
export class ProductInItemComponent implements OnInit {

  productId!: number;
  items: any[] = [];
  product: any; // Property to hold the product data

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private _ApiProductsService: ApiProductsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadItems();
      this.loadProduct();
    });
  }


  loadItems(): void {
    const itemsPerPage = 12;
    const pageNumber = 1;

    this.itemService.getItemsByProductId(this.productId, itemsPerPage, pageNumber).subscribe(items => {
      this.items = items.entities; // Corrected to access 'entities'
    }, error => {
      console.error('Error fetching items', error);
    });
  }

  loadProduct(): void {
    this._ApiProductsService.getProductById(this.productId).subscribe(product => {
      this.product = product.entity;
    }, error => {
      console.error('Error fetching product', error);
    });
  }

  Delete(id: number): void {
    this.itemService.SDelete(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully');
        this.loadItems();
      },
      error: (err) => {
        console.error('Error in deleting product', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
