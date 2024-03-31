import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-all-categories',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './get-all-categories.component.html',
  styleUrl: './get-all-categories.component.css'
})
export class GetAllCategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  page: number = 1;
  pageSize: number = 5;

  constructor(private _CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._CategoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching all categories without pagination', err);
      }
    });
 }

  getAllCategories(): void {
    this._CategoryService.getAllCategories(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }


  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getAll();
    }
  }

  nextPage(): void {
    this.page++;
    this.getAll();
  }

  hardDelete(id: number,name: string): void {
    this._CategoryService.hardDelete(id,name).subscribe({
      next: (response) => {
        console.log('Category soft-deleted successfully');
        this.getAll();
      },
      error: (err) => {
        console.error('Error soft-deleting category', err);
      }
    });
  }

}
