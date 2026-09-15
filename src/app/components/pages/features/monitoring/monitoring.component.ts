import { AfterViewInit, Component, ElementRef, inject, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapCheckCircleFill,
  bootstrapSearch,
  bootstrapBarChartFill,
  bootstrapExclamationTriangleFill,
  bootstrapLightningChargeFill,
} from '@ng-icons/bootstrap-icons';
import { ScrollspyService } from '@services/scrollspy.service';

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
    }),
  ],
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
  standalone: true,
})
export class MonitoringComponent implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const sections = [
      { selector: 'app-monitoring-event', path: '/features/monitoring/event' },
      { selector: 'app-monitoring-workflow', path: '/features/monitoring/workflow' },
      { selector: 'app-monitoring-user', path: '/features/monitoring/user' },
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
}
