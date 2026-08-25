import {Component, EventEmitter, Output, computed, inject, signal} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly translate = inject(TranslateService);

  @Output() searchOpen = new EventEmitter<void>();

  readonly isFirefox = typeof navigator !== 'undefined' && /Firefox\//.test(navigator.userAgent);
  readonly repoMenuOpen = signal(false);
  readonly docMenuOpen = signal(false);
  readonly currentLang = computed(() => this.translate.currentLang() ?? 'fr');

  // Redirect to the latest version of each component on Docker Hub, Maven Central, and npm
  readonly menuItems = [
    { label: 'inspect-app', link: 'https://hub.docker.com/r/oneteme/inspect-app/tags' },
    {
      label: 'inspect-core',
      link: 'https://mvnrepository.com/artifact/io.github.oneteme/inspect-core/versions',
    },
    {
      label: 'inspect-ng-collector',
      link: 'https://www.npmjs.com/package/@oneteme/inspect-ng-collector?activeTab=versions',
    },
    { label: 'inspect-server', link: 'https://hub.docker.com/r/oneteme/inspect-server/tags' },
  ];

  constructor() {
    this.translate.addLangs(['fr', 'en']);
  }

  toggleMenu(): void {
    this.repoMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.repoMenuOpen.set(false);
  }

  openSearch() {
    this.searchOpen.emit();
  }

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'fr' ? 'en' : 'fr';
    this.translate.use(nextLang).subscribe();
  }

  goHome(): void {
    window.location.assign('/');
  }

  goToGithub() {
    window.open('https://github.com/oneteme', '_blank');
  }

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

  toggleDocMenu(): void {
    this.docMenuOpen.set(!this.docMenuOpen());
  }
}
