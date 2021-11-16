import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

let interval$ = interval(1000);
let subscription;

start$.subscribe((v) => {
  console.log('Start');
  subscription = interval$.subscribe(setCount);
});

pause$.subscribe((v) => {
  console.log('pause');
  subscription.unsubscribe();
});
