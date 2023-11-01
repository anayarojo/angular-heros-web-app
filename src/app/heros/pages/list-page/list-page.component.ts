import {
    Component,
    OnInit,
} from '@angular/core';

import { Hero } from '../../interfaces';
import { HerosService } from '../../services';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {
  public heros: Hero[] = [];

  constructor(private herosService: HerosService) {}

  ngOnInit(): void {
    this.herosService.getHeros()
      .subscribe(heros => this.heros = heros);
  }
}
