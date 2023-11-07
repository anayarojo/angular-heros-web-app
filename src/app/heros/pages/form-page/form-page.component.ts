import {
    Component,
    OnInit,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ActivatedRoute,
    Router,
} from '@angular/router';

import {
    filter,
    switchMap,
} from 'rxjs';

import { ConfirmDialogComponent } from '../../components';
import {
    Hero,
    Publisher,
} from '../../interfaces';
import { HerosService } from '../../services';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styles: [
  ]
})
export class FormPageComponent implements OnInit {
  public heroForm!: FormGroup

  public publishers = [
    {
      id: 'DC Comics',
      value: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      value: 'Marvel - Comics'
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private herosService: HerosService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.heroForm = this.formBuilder.group({
      id: [''],
      superhero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      publisher: [Publisher.DCComics, [Validators.required]],
      alter_ego: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      first_appearance: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      characters: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      alt_img: ['', []],
    });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.herosService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) {
          this.router.navigateByUrl('/');
          return;
        }

        this.heroForm.reset(hero);
      });
  }

  delete() {
    if (!this.currentHero.id) {
      throw new Error('Hero id is required.');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero
    });

    dialogRef.afterClosed()
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() => this.herosService.deleteHero(this.currentHero.id)),
        filter(deleted => deleted),
      )
      .subscribe(() => {
        this.showSnackbar(`Hero ${this.currentHero.superhero} deleted successfully.`);
        this.router.navigate(['/heros']);
      });
  }

  save() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    if (this.currentHero.id) {
      this.herosService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`Hero ${hero?.superhero} updated successfully.`);
        });
      return;
    }

    this.herosService.addHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar(`Hero ${hero.superhero} created successfully.`);
        this.router.navigateByUrl(`/heros/edit/${hero.id}`);
      });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500
    });
  }
}
