import { Component } from '@angular/core';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styles: [
  ]
})
export class FormPageComponent {
  public publishers = [
    {
      id: 'DC Comics',
      value: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      value: 'Marvel - Comics'
    }
  ]
}
