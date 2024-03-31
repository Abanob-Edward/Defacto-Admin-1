import { Routes } from '@angular/router';
import { AddProductComponent } from './components/Products/add-product/add-product.component';
import { DeleteProductComponent } from './components/Products/delete-product/delete-product.component';
import { UpdateProductComponent } from './components/Products/update-product/update-product.component';
import { GetAllProductsComponent } from './components/Products/get-all-products/get-all-products.component';
import { UpdateCategoryComponent } from './components/Categories/update-category/update-category.component';
import { GetAllCategoriesComponent } from './components/Categories/get-all-categories/get-all-categories.component';
import { AddCategoryComponent } from './components/Categories/add-category/add-category.component';


export const routes: Routes = [
  { path: 'AddProduct', component: AddProductComponent },
  { path: 'DeletProduct', component: DeleteProductComponent },
  { path: 'UpdateProduct', component: UpdateProductComponent },
  { path: 'update-category/:id', component: UpdateCategoryComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'get-all-categories', component: GetAllCategoriesComponent },
  // {
  //   path: 'get-all-categories', component: GetAllCategoriesComponent, children: [{ path: 'update-category/:id', component: UpdateCategoryComponent }]
  // },
  { path: 'GetAllProduct', component: GetAllProductsComponent }

];
