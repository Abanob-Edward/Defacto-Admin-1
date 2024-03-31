import { Component } from '@angular/core';

import { UserAuthService } from '../../services/user-auth.service'; // Ensure the path is correct
import { ILogin } from '../../Models/ilogin'; // Ensure the path is correct
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(private userAuthService: UserAuthService) {} // Corrected service name

 loginObj: ILogin = {
    "email": "",
    "password": ""
 };

 onLogin() {
    this.userAuthService.login(this.loginObj.email,this.loginObj.password).subscribe(
      () => console.log('Login successful'),
      error => console.error('Error:', error)
    );
 }
}
