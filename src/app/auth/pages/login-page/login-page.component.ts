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
    this.authService.login('john.doe@email.com', 'secret')
      .subscribe(logged => {
        if (logged) {
          this.router.navigate(['/']);
        }
      });
  }
}
