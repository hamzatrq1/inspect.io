import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapCheckCircleFill,
  bootstrapSearch,
  bootstrapBarChartFill,
  bootstrapExclamationTriangleFill,
  bootstrapLightningChargeFill, bootstrapArrowDown,
} from '@ng-icons/bootstrap-icons';
import { ScrollspyService } from '@services/scrollspy.service';
import { goToPage } from '@utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitoring',
  imports: [
    TranslateModule,
    NgIcon
  ],
  providers: [
    provideIcons({
      bootstrapCheckCircleFill,
      bootstrapSearch,
      bootstrapBarChartFill,
      bootstrapExclamationTriangleFill,
      bootstrapLightningChargeFill,
      bootstrapArrowDown
    }),
  ],
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
  standalone: true,
})
export class MonitoringComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

  readonly isTransitioning = signal(false);


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
        { selector: 'app-monitoring-event', path: '/features/monitoring/events' },
        { selector: 'app-monitoring-workflow', path: '/features/monitoring/events' },
        { selector: 'app-monitoring-user', path: '/features/monitoring/events' },
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
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
      );

      sections.forEach(({ selector }) => {
        const el = this.elementRef.nativeElement.querySelector(selector);
        if (el) this.observer?.observe(el);
      });

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        this.observer?.disconnect();
        this.scrollSpy.setActivePath(null);
      });
    }
  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollSpy.setActivePath(null);
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/monitoring/events');
  }

}
