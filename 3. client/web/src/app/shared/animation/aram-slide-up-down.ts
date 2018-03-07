import { trigger, state, animate, transition, style } from '@angular/animations';

export const aramSlideUpDown = trigger('aramSlideUpDown', [
  transition(':enter', [
    style({height: 0, opacity: 0}),
    animate('300ms', style({height: '*', opacity: 1}))
  ]),
  transition(':leave', [
    style({height: '*', opacity: 1}),
    animate('300ms', style({height: 0, opacity: 0}))
  ])
  /*transition(':enter', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)', opacity: 1}),
    animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
  ])*/
]);
