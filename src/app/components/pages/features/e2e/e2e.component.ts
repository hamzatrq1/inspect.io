import { Component, inject, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDiagram3Fill,
  bootstrapShieldCheck,
  bootstrapSpeedometer2,
  bootstrapHddNetworkFill,
  bootstrapCheckCircleFill, bootstrapArrowDown
} from '@ng-icons/bootstrap-icons';
import { ScrollspyService } from '@services/scrollspy.service';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { Router } from '@angular/router';

@Component({
  imports: [TranslateModule, NgIconComponent],
  selector: 'app-e2e',
  styleUrls: ['./e2e.component.scss'],
  templateUrl: './e2e.component.html',
  standalone: true,
  viewProviders: [
    provideIcons({
      bootstrapDiagram3Fill,
      bootstrapShieldCheck,
      bootstrapSpeedometer2,
      bootstrapHddNetworkFill,
      bootstrapCheckCircleFill,
      bootstrapArrowDown
    })
  ]
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
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      const revealElements = this.elementRef.nativeElement.querySelectorAll('.reveal');
      revealElements.forEach((element: Element) => observer.observe(element));

      const sections = [
        { selector: 'app-trace-tree', path: '/features/e2e/tree' },
        { selector: 'app-thread-tracking', path: '/features/e2e/thread' },
        { selector: 'app-dynamic-cartography', path: '/features/e2e/architecture' },
      ];

      sections.forEach(({ selector }) => {
        const el = this.elementRef.nativeElement.querySelector(selector);
        if (el) this.observer?.observe(el);
      });
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollSpy.setActivePath(null);
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/e2e/tree');
  }
}
