import { trigger, animate, transition, style } from '@angular/animations';

export const aramSlideUpDown = trigger('aramSlideUpDown', [
  transition(':enter', [
    style({height: 0, opacity: 0}),
    animate('300ms', style({height: '*', opacity: 1}))
  ]),
  transition(':leave', [
    style({height: '*', opacity: 1}),
    animate('500ms', style({height: 0, opacity: 0}))
  ])
]);
