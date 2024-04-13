
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: UserAuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/Login');
      return false;
    }
    return true;
  }
}
