import { Component } from '@angular/core';
import { ILogin } from '../../Models/ilogin'; // Ensure the path is correct
import { FormsModule } from '@angular/forms';

import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userauth: UserAuthService,private router:Router) { }

  loginObj: ILogin = {
    email: '',
    password: '',
  };

  onLogin() {
    this.userauth.login(this.loginObj).subscribe(
      () => {
        this.router.navigateByUrl("/OrderChart")
        alert('Login Success');
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }

}
