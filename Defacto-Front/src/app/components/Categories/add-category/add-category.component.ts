import { Component } from '@angular/core';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category: ICategory = {
    id: 0,
    name: '',
    subCategory: null,
    description: null,
    categoryImage: null
  };

  constructor(private categoryService: CategoryService, private router: Router) { }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      this.category.categoryImage = file;
    }
  }


  addCategory() {
    const formData: FormData = new FormData();
    formData.append('name', this.category.name);
    if (this.category.subCategory) {
      formData.append('subCategory', this.category.subCategory.toString());
    }
    if (this.category.description) {
      formData.append('description', this.category.description);
    }
    if (this.category.categoryImage) {
      formData.append('categoryImage', this.category.categoryImage, this.category.categoryImage.name);
    }

    this.categoryService.createCategory(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.router.navigateByUrl(`/get-all-categories`)
  }
}