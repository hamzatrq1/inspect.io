import { Component, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ApiComponent } from '@app/components/pages/features/monitoring/api/api.component';
import { ScrollspyService } from '@app/services/scrollspy.service';

@Component({
  selector: 'app-monitoring',
  imports: [TranslateModule, ApiComponent],
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
  standalone: true,
})
export class MonitoringComponent implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const sections = [
      { selector: 'app-api', path: '/features/monitoring/api' },
      { selector: 'app-batch', path: '/features/monitoring/batch' },
      { selector: 'app-tests', path: '/features/monitoring/tests' },
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
