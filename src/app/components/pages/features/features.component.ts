import {Component, HostListener, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';

@Component({
  selector: 'app-features',
  imports: [TranslatePipe],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);

  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);
  readonly isScrollDownVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    isScrollDownVisible: this.isScrollDownVisible,
    onNavigateUp: () => this.goToHome(),
    onNavigateDown: () => this.goToInstallation(),
  });

  goToInstallation(): void {
    goToPage(this.isTransitioning(), this.router, '/installation');
  }

  goToHome(): void {
    goToPage(this.isTransitioning(), this.router, '/');
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
