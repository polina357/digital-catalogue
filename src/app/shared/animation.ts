import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    state('*', style({ transform: 'translateX(0)' })),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('300ms 300ms')
    ]),
    transition(':leave', [
      animate(300, style({ transform: 'translateX(100%)' }))
    ])
  ]);

