import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { MonitoringComponent } from '@app/components/pages/features/monitoring/monitoring.component';
import { E2eComponent } from '@app/components/pages/features/e2e/e2e.component';
import { MetricsComponent } from '@app/components/pages/features/metrics/metrics.component';
import { HealthComponent } from '@app/components/pages/features/health/health.component';
import { AutonomyComponent } from '@app/components/pages/features/autonomy/autonomy.component';
import { ScrollspyService } from '@services/scrollspy.service';

@Component({
  selector: 'app-features',
  imports: [
    MonitoringComponent,
    E2eComponent,
    MetricsComponent,
    HealthComponent,
    AutonomyComponent,
  ],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  standalone: true,
})
export class FeaturesComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

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

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const sections = [
      { selector: 'app-monitoring', path: '/features/monitoring' },
      { selector: 'app-e2e', path: '/features/e2e' },
      { selector: 'app-analytics', path: '/features/analytics' },
      { selector: 'app-health', path: '/features/health' },
      { selector: 'app-autonomy', path: '/features/autonomy' },
      { selector: 'app-traceability', path: '/features/traceability' },
    ];

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sections.find((s) => entry.target.matches(s.selector));
            if (match) {
              this.scrollSpy.setActivePath(match.path);
            }
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(({ selector }) => {
      const el = this.elementRef.nativeElement.querySelector(selector);
      if (el) this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollSpy.setActivePath(null);
  }

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
