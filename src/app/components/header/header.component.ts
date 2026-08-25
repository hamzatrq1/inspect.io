import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
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
}
