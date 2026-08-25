import {Component, inject } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import { RouterLink, RouterOutlet} from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, TranslatePipe, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly translate = inject(TranslateService);
  constructor() {}

  readonly docMenuItems = [
    { label: 'header.menu.home', link: '/' },
    { label: 'header.menu.installation', link: '/installation' },
    { label: 'header.menu.quick-start', link: '/demonstration' },
    // sous titre : c'est pour qui inspect (PO, DEV, Suivi...)
    // pas trop de plue value : à retirer
    // mentionner que les img docker ont besoin de manip en plus (certifs etc)
    // DualEventTrace => event tracé 2 fois, début et fin
    // Quand le traitement prend fin, on cherche sa fin pour avoir une meilleure visibilité dessus
    {
      label: 'header.menu.architecture.title',
      link: '/architecture',
      children: [
        { label: 'header.menu.architecture.application', link: '/architecture' },
        { label: 'header.menu.architecture.collector', link: '/architecture' },
        { label: 'header.menu.architecture.server', link: '/architecture' },
      ],
    },
    { label: 'Compatibilités', link: '/TODO' }, // java, js, parler de spring des framework
    // parler des dépendances techniques IMPORTANTES, jakarta pour l'envoi de mail
    // pour du HTTP REST, on utilise Reactor et une autre => intéressant de lister
    { label: 'header.menu.technical-description', link: '/TODO' },
    { label: 'header.menu.conduct-code', link: '/TODO' },
    { label: 'header.menu.contributing', link: '/TODO' },
  ];
}
