import {
    Component,
    OnInit,
} from '@angular/core';
import {
    ActivatedRoute,
    Router,
} from '@angular/router';

import {
    delay,
    switchMap,
} from 'rxjs';

import { Hero } from '../../interfaces';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styles: [
  ]
})
export class FormPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private herosService: HerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({id}) => this.herosService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) {
          this.router.navigate(['./heros/list']);
          return;
        }

        this.hero = hero;
      });
  }

  goBack(): void {
    this.router.navigate(['./heros/list']);
  }
}
