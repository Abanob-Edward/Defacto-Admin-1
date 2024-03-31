import { Routes } from '@angular/router';
import { AddProductComponent } from './components/Products/add-product/add-product.component';
import { DeleteProductComponent } from './components/Products/delete-product/delete-product.component';
import { UpdateProductComponent } from './components/Products/update-product/update-product.component';
import { GetAllProductsComponent } from './components/Products/get-all-products/get-all-products.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: "", redirectTo: "Login", pathMatch: "full" },
 { path: "Login", component: LoginComponent },
 //{
   // path: 'Authenticated',
   // canActivate: [UserAuth],
  // children: [
    { path: 'GetAllProducts', component: GetAllProductsComponent },
      { path: 'AddProduct', component: AddProductComponent },
      { path: 'DeleteProduct', component: DeleteProductComponent },
  { path: 'UpdateProduct', component: UpdateProductComponent },
     // {path:"**",component:LoginComponent}
   // ]
// }
];
