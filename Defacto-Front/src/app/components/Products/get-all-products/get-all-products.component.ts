import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/iproduct';
import { ApiProductsService } from '../../../services/api-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-products',
  standalone: true,
  imports: [],
  templateUrl: './get-all-products.component.html',
  styleUrl: './get-all-products.component.css'
})
export class GetAllProductsComponent  /*implements OnChanges, OnInit*/ {
  filteredProducts: IProduct[] = [];
  @Input() recivedCatId: number = 0;

  constructor(private _ApiProductsService: ApiProductsService, private router: Router) { }

  ngOnChanges(): void {
    this._ApiProductsService.getProductsByCategoryID(this.recivedCatId).subscribe({
      next: (res) => {
        this.filteredProducts = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  ngOnInit(): void {
    this._ApiProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.filteredProducts = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

}

