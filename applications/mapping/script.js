import { of, from, interval, fromEvent, merge, NEVER } from 'rxjs';
import { pluck, concatMap, take, map, mergeMap } from 'rxjs/operators';

import {
  getCharacter,
  render,
  startButton,
  pauseButton,
  setStatus,
} from './utilities';

// const character$ = from(getCharacter(1)).pipe(pluck('name'));
const character$ = of(1, 2, 3, 4).pipe(mergeMap((n) => getCharacter(n)));

character$.subscribe(render);
