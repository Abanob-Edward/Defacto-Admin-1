import { Component } from '@angular/core';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubCategory } from '../../../Models/sub-category';
import { Location } from '@angular/common';

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
    categoryImage: null,
    ar_Name: null,
    ar_Description: null,
    image: null
  };

  constructor(private location: Location, private categoryService: CategoryService, private router: Router) { }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      this.category.categoryImage = file;
    }
  }


  addCategory() {
    const formData: FormData = new FormData();
    formData.append('name', this.category.name);
    formData.append('subCategory', this.category.subCategory?.toString() ?? '');
    formData.append('description', this.category.description ?? '');
    formData.append('ar_Name', this.category.ar_Name ?? '');
    formData.append('ar_Description', this.category.ar_Description ?? '');
    formData.append('image', this.category.image ?? '');
    if (this.category.categoryImage) {
      formData.append('categoryImage', this.category.categoryImage, this.category.categoryImage.name);
    }

    this.categoryService.createCategory(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        this.router.navigateByUrl(`/GetAllCategories`);
      }
    });
  }



  getSubCategories(): { name: string; value: number }[] {
    return Object.keys(SubCategory)
      .filter(key => isNaN(Number(key))) // Filter out numeric keys
      .map(key => ({ name: key, value: SubCategory[key as keyof typeof SubCategory] }));
  }

  goBack() {
    this.location.back();
  }

}
