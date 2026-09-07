import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';

@Component({
  imports: [TranslateModule],
  selector: 'app-compatibilities',
  styleUrls: ['./compatibilities.component.scss'],
  templateUrl: './compatibilities.component.html',
  standalone: true,
})
export class CompatibilitiesComponent {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);
  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    onNavigateUp: () => this.goToInstallation(),
    onNavigateDown: () => this.goToArchitecture(),
  });

  goToInstallation(): void {
    goToPage(this.isTransitioning(), this.router, '/installation');
  }

  goToArchitecture(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
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
// java, js, parler de spring des framework
