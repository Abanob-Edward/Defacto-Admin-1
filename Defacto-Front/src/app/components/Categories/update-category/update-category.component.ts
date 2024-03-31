import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {
  category: ICategory = {
    id: 0,
    name: '',
    subCategory: null,
    description: null,
    categoryImage: null
  };

  constructor(private _CategoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._CategoryService.getCategoryByID(+id).subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (err) => {
          console.error('Error fetching category', err);
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      this.category.categoryImage = file;
    }
  }

  onSubmit(): void {
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

    this._CategoryService.updateCategory(formData).subscribe({
      next: (response) => {
        console.log('Category updated successfully');
      },
      error: (err) => {
        console.error('Error updating category', err);
      }
    });
    this.router.navigateByUrl('/get-all-categories');
  }
}