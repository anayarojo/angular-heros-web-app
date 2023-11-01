import { Component } from '@angular/core';

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
}
