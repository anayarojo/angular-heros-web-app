import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems = [
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

  constructor(private router: Router) {}

  public logout(): void {
    this.router.navigate(['/auth']);
  }
}
