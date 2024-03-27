import { Routes } from '@angular/router';
import { AddProductComponent } from './components/Products/add-product/add-product.component';
import { DeleteProductComponent } from './components/Products/delete-product/delete-product.component';
import { UpdateProductComponent } from './components/Products/update-product/update-product.component';
import { GetAllProductsComponent } from './components/Products/get-all-products/get-all-products.component';


export const routes: Routes = [
  { path: 'AddProduct', component: AddProductComponent },
  { path: 'DeletProduct', component: DeleteProductComponent },
  { path: 'UpdateProduct', component: UpdateProductComponent },
  { path: 'GetAllProduct', component: GetAllProductsComponent }

];
