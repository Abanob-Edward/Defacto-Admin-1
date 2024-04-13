import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../../../Models/iitem';
import { ItemService } from '../../../services/item.service';
import { SizeService } from '../../../services/size.service';
import { ColorService } from '../../../services/color.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent implements OnInit {
  sizes: any[] = [];
  colors: any[] = [];
  item: IItem = {
    id: 0,
    isForDefacto: false,
    quantity: 0,
    price: 0,
    sizeID: 0,
    sizeName: '',
    colorID: 0,
    colorName: '',
    productID: 0
  };

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router, private _ColorService: ColorService, private _SizeService: SizeService, private location: Location) { }

  ngOnInit(): void {
    const lastNavigation = this.router.lastSuccessfulNavigation;
    if (lastNavigation && lastNavigation.extras && lastNavigation.extras.state) {
      this.item = lastNavigation.extras.state['item'];
    }

    this._SizeService.getAllSizes().subscribe(sizes => {
      this.sizes = sizes.entities;
    });

    this._ColorService.getColors().subscribe(colors => {
      this.colors = colors.entities;
    });
  }

  updateItem(): void {
    this.itemService.updateItem(this.item).subscribe({
      next: (response) => {
        // Handle successful update
        const lastNavigation = this.router.lastSuccessfulNavigation;
        if (lastNavigation && lastNavigation.extras && lastNavigation.extras.state) {
          this.item = lastNavigation.extras.state['item'];
          this.router.navigateByUrl(`/ProductInItem/${this.item.productID}`);
        }
      },
      error: (error) => {
        // Handle error
      }
    });
  }



}












