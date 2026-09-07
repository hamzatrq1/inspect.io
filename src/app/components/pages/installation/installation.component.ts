import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss'],
  host: {
    '[class.installation-transitioning]': 'isTransitioning()',
  },
  imports: [MarkdownModule],
  standalone: true,
})
export class InstallationComponent {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);

  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    onNavigateUp: () => this.goToFeatures(),
    onNavigateDown: () => this.goToCompatibilities(),
  });

  goToFeatures(): void {
    goToPage(this.isTransitioning(), this.router, '/features');
  }

  goToCompatibilities(): void {
    goToPage(this.isTransitioning(), this.router, '/compatibilities');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollNav.onScroll();
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    this.scrollNav.onWheel(event);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.scrollNav.onTouchStart(event);
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    this.scrollNav.onTouchMove(event);
  }
}
