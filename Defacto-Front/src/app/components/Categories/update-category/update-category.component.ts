import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubCategory } from '../../../Models/sub-category';
import { Location } from '@angular/common';

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
    categoryImage: null,
    ar_Name: null,
    ar_Description: null,
    image: null
  };

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation && navigation.extras.state) {
      this.category = navigation.extras.state['category'];
    }
  }


  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      this.category.categoryImage = file;
    }
  }

  updateCategory() {
    const formData: FormData = new FormData();
    formData.append('id', this.category.id.toString());
    formData.append('name', this.category.name);
    formData.append('subCategory', this.category.subCategory?.toString() ?? '');
    formData.append('description', this.category.description ?? '');
    formData.append('ar_Name', this.category.ar_Name ?? '');
    formData.append('ar_Description', this.category.ar_Description ?? '');
    formData.append('image', this.category.image ?? '');
    if (this.category.categoryImage) {
       formData.append('categoryImage', this.category.categoryImage, this.category.categoryImage.name);
    }
   
    this.categoryService.updateCategory(this.category.id, formData).subscribe({
       next: (response) => {
         console.log(response);
       },
       error: (error) => {
         console.error(error);
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