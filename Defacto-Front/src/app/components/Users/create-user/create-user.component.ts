import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../Models/iuser';

@Component({
 selector: 'app-create-user',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterLink],
 templateUrl: './create-user.component.html',
 styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newAccount:IUser = {
    id: '',
    userName: '',
    email: '',
    isBlocke: false,
    role: '',
    name: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    Image: ''
 };
  roles = [

    { name: 'Admin' },
    { name: 'Vendor' },
 ];

 constructor(private userservice: UsersService) { }
 onSubmit() {

  this.userservice.createUser(this.newAccount.role, this.newAccount).subscribe({
    next: (response) => {
      console.log(response);
      response=  this.newAccount ;
    },
    error: (error) => {
      console.error('Error creating user:', error);
    }
  });
}


 handleImageInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newAccount.Image = file;
    }
 }
}
