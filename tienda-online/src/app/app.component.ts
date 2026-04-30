import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/navbar/footer.component';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

const routeAnim = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', style({ opacity: 0, transform: 'translateY(18px)' }), { optional: true }),
    group([
      query(':leave',
        animate('120ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
        { optional: true }
      ),
      query(':enter',
        animate('220ms 80ms cubic-bezier(0.22,1,0.36,1)',
          style({ opacity: 1, transform: 'translateY(0)' })),
        { optional: true }
      ),
    ]),
  ]),
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  animations: [routeAnim],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  routeKey(outlet: RouterOutlet): string {
    return outlet?.isActivated
      ? (outlet.activatedRoute.snapshot.url[0]?.path ?? 'home')
      : '';
  }
}
