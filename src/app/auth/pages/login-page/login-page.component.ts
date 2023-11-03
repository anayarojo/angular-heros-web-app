import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private router: Router, private authService: AuthService) {}

  public login(): void {
    this.authService.login('fernando@gmail.com', '123456')
      .subscribe(user => {
        if (user.id) {
          this.router.navigate(['/']);
        }
      });
  }
}
