import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../../Models/iproduct';
import { ApiProductsService } from '../../../services/api-products.service';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../Models/icategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: IProduct = {
     id: 0,
     title: '',
     isApproved: false,
     productGender: null,
     categoryId: 0,
     code: '',
     description: '',
     productImage1: null,
     productImage2: null,
     productImage3: null,
     productImage4: null,
     vendorId: 'df97b120-8a95-4d42-8aa2-85da7c94dee2'
  };
 
  constructor(private productsService: ApiProductsService, private router: Router) { }
 
  onFileSelected(event: Event, imageNumber: number) {
     const file = (event.target as HTMLInputElement).files?.[0] ?? null;
     if (file) {
       switch (imageNumber) {
         case 1:
           this.product.productImage1 = file;
           break;
         case 2:
           this.product.productImage2 = file;
           break;
         case 3:
           this.product.productImage3 = file;
           break;
         case 4:
           this.product.productImage4 = file;
           break;
       }
     }
  }
 
  addProduct() {
     const formData: FormData = new FormData();
     formData.append('title', this.product.title);
     formData.append('isApproved', this.product.isApproved.toString());
     formData.append('productGender', this.product.productGender ? this.product.productGender.toString() : '');
     formData.append('categoryId', this.product.categoryId.toString());
     formData.append('code', this.product.code ? this.product.code : '');
     formData.append('description', this.product.description);
     formData.append('vendorId', this.product.vendorId);
 
     // Append images if they exist
     if (this.product.productImage1) {
       formData.append('productImage1', this.product.productImage1, this.product.productImage1.name);
     }
     if (this.product.productImage2) {
       formData.append('productImage2', this.product.productImage2, this.product.productImage2.name);
     }
     if (this.product.productImage3) {
       formData.append('productImage3', this.product.productImage3, this.product.productImage3.name);
     }
     if (this.product.productImage4) {
       formData.append('productImage4', this.product.productImage4, this.product.productImage4.name);
     }
 
     this.productsService.createProduct(formData).subscribe({
       next: (response) => {
         console.log(response);
        //  this.router.navigateByUrl(`/GetAllProduct`);
       },
       error: (error) => {
         console.error(error);
       }
     });
  }
 }