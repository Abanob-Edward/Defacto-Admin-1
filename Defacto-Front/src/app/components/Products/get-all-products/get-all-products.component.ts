import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/iproduct';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { ApiIProduct } from '../../../Models/api-iproduct';
import { Observable, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ApiProductsService } from '../../../services/api-products.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-get-all-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './get-all-products.component.html',
  styleUrl: './get-all-products.component.css'
})
export class GetAllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  category: any;
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(
    private location: Location,
    private apiProductsService: ApiProductsService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts(this.currentPage, this.itemsPerPage);
    this.getAllCategories();
  }

  getAllProducts(page: number, itemsPerPage: number): void {
    this.apiProductsService.getAllProductsWithPaging(page, itemsPerPage).subscribe(data => {
      this.products = data.entities;
    });
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  filterByCategory(categoryId: number | 0): void {
    if (categoryId == 0) {
      this.getAllProducts(this.currentPage, this.itemsPerPage);
    } else {
      this.apiProductsService.getProductsByCategoryID(categoryId, this.itemsPerPage).subscribe(data => {
        this.products = data.entities;
      });
    }
  }


  Delete(id: number): void {
    this.apiProductsService.SDelete(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully');
        this.getAllProducts(this.currentPage, this.itemsPerPage);
      },
      error: (err) => {
        console.error('Error in deleting product', err);
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllProducts(this.currentPage, this.itemsPerPage);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getAllProducts(this.currentPage, this.itemsPerPage);
  }

  goBack() {
    this.location.back();
  }
}