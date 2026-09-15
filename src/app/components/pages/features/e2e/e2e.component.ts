import { Component, inject, ElementRef, AfterViewInit, OnDestroy, HostListener, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThreadTrackingComponent } from '@app/components/pages/features/e2e/thread-tracking/thread-tracking.component';
import {
  DynamicCartographyComponent
} from '@app/components/pages/features/e2e/dynamic-cartography/dynamic-cartography.component';
import { TraceTreeComponent } from '@app/components/pages/features/e2e/trace-tree/trace-tree.component';
import { ScrollspyService } from '@services/scrollspy.service';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { Router } from '@angular/router';

@Component({
  imports: [TranslateModule, ThreadTrackingComponent, DynamicCartographyComponent, TraceTreeComponent],
  selector: 'app-e2e',
  styleUrls: ['./e2e.component.scss'],
  templateUrl: './e2e.component.html',
  standalone: true,
})
export class E2eComponent implements AfterViewInit, OnDestroy {
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
    onNavigateDown: () => this.goToNext(),
  });

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const sections = [
      { selector: 'app-trace-tree', path: '/features/e2e/tree' },
      { selector: 'app-thread-tracking', path: '/features/e2e/thread' },
      { selector: 'app-dynamic-cartography', path: '/features/e2e/architecture' },
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

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/e2e/tree');
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
