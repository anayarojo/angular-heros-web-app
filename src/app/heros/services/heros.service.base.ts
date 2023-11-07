import { Observable } from 'rxjs';

import { Hero } from '../interfaces';

export abstract class HerosService {
  abstract getHeros(): Observable<Hero[]>;
  abstract getHeroById(id: string): Observable<Hero|undefined>;
  abstract getSuggestions(query: string, limit?: number): Observable<Hero[]>;
  abstract addHero(hero: Hero): Observable<Hero>;
  abstract updateHero(hero: Hero): Observable<Hero|undefined>;
  abstract deleteHero(id: string): Observable<boolean>;
}
