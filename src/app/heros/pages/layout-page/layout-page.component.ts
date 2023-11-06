import {
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    AuthService,
    User,
} from '../../../auth';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent implements OnInit {
  public herosSidebarItems = [
    {
      icon: 'label',
      label: 'List',
      route: './list'
    },
    {
      icon: 'add',
      label: 'Add',
      route: './new'
    },
    {
      icon: 'search',
      label: 'Search',
      route: './search'
    },
  ]

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthentication()
      .subscribe(isAuthenticated => {

      });
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }
}
