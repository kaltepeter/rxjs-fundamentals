import {
  fromEvent,
  interval,
  merge,
  NEVER,
  skipUntil,
  takeUntil,
  scan,
} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

// let interval$ = interval(1000);
// let subscription;

// start$.subscribe((v) => {
//   console.log('Start');
//   subscription = interval$.subscribe(setCount);
// });

// pause$.subscribe((v) => {
//   console.log('pause');
//   subscription.unsubscribe();
// });

// interval$.pipe(skipUntil(start$), takeUntil(pause$)).subscribe(setCount);
// const counter$ = interval(1000).pipe(skipUntil(start$), takeUntil(pause$));
const counter$ = interval(1000).pipe(
  skipUntil(start$),
  scan((state) => state + 1, 0),
  takeUntil(pause$),
);

counter$.subscribe(setCount);
