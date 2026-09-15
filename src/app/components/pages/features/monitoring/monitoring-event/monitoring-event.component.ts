import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowRight,
  bootstrapCheckCircleFill,
  bootstrapRocketTakeoffFill,
  bootstrapGlobe,
  bootstrapGearFill,
  bootstrapPower,
  bootstrapCheck2Circle,
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

export type ContextKey = 'api' | 'batch' | 'startup' | 'test';

export interface TelemetryLine {
  time: string;
  pillClass: string;
  pillText: string;
  text: string;
}

export interface TelemetryMetric {
  label: string;
  val: string;
}

export interface ContextData {
  badgeText: string;
  lines: TelemetryLine[];
  metrics: TelemetryMetric[];
}

@Component({
  selector: 'app-monitoring-event',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapPower,
      bootstrapCheck2Circle,
      hugeComputerProgramming01,
    }),
  ],
  templateUrl: './monitoring-event.component.html',
  styleUrls: ['./monitoring-event.component.scss'],
  standalone: true,
})
export class MonitoringEventComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

  readonly selectedContext = signal<ContextKey>('api');
  readonly isTransitioning = signal(false);

  readonly contextsData: Record<ContextKey, ContextData> = {
    api: {
      badgeText: 'HTTP / REST',
      lines: [
        { time: '14:32:01.102', pillClass: 'pill-api', pillText: 'REST_REQ', text: 'GET /api/v1/orders/ORD-9842 · Auth: Bearer ***' },
        { time: '14:32:01.115', pillClass: 'pill-success', pillText: 'JDBC_STAGE', text: 'SELECT * FROM orders WHERE id = ? · 4.2ms (HikariCP)' },
        { time: '14:32:01.128', pillClass: 'pill-api', pillText: 'EXT_CALL', text: 'POST https://payment.partner.net/authorize · 18.1ms (p95)' },
        { time: '14:32:01.141', pillClass: 'pill-success', pillText: 'REST_RESP', text: 'Status: 200 OK · Payload: 1.4 KB · Trace-ID: 7a9e-f41c' },
      ],
      metrics: [
        { label: "Type d'événement", val: 'HttpSessionSignal' },
        { label: 'Durée totale p99', val: '39 ms' },
        { label: 'Statut réponse', val: '200 OK' },
        { label: 'I/O rattachées', val: '1 JDBC, 1 REST' },
        { label: 'Propagation context', val: 'ThreadLocal (#nio-8080-exec-4)' },
      ],
    },
    batch: {
      badgeText: 'BATCH EXECUTION',
      lines: [
        { time: '02:00:00.012', pillClass: 'pill-batch', pillText: 'BATCH_INIT', text: 'MainSessionType.BATCH · Job: [InvoiceDailyReconciliationJob]' },
        { time: '02:00:05.412', pillClass: 'pill-success', pillText: 'CHUNK_READ', text: 'Batch Step [ReadPendingInvoices] · 10,000 items loaded (JDBC)' },
        { time: '02:02:18.890', pillClass: 'pill-warn', pillText: 'FTP_STAGE', text: 'SFTP upload invoice_20260908.dat · 842.1 MB transferred' },
        { time: '02:03:45.105', pillClass: 'pill-success', pillText: 'BATCH_DONE', text: 'Job completed · Status: COMPLETED · 0 errors' },
      ],
      metrics: [
        { label: "Type d'événement", val: 'MainSessionSignal (BATCH)' },
        { label: 'Durée globale', val: '3m 45s' },
        { label: 'Lignes traitées', val: '10,000 records' },
        { label: 'Flux sortants', val: 'JDBC (chunked) + SFTP export' },
        { label: 'Gestion des threads', val: 'SessionContextManager.aroundRunnable' },
      ],
    },
    startup: {
      badgeText: 'STARTUP BOOT',
      lines: [
        { time: '08:15:00.001', pillClass: 'pill-startup', pillText: 'JVM_START', text: 'SessionContextManager.createStartupSession() · Global Context' },
        { time: '08:15:01.320', pillClass: 'pill-success', pillText: 'SPRING_BOOT', text: 'ApplicationContext initialized: 142 beans instantiated in 1,290ms' },
        { time: '08:15:02.100', pillClass: 'pill-success', pillText: 'DB_MIGRATION', text: 'Flyway / Liquibase: schema validation passed (0 pending scripts)' },
        { time: '08:15:02.450', pillClass: 'pill-startup', pillText: 'READY', text: 'Server started on port 8080 (Production Ready in 2.45s)' },
      ],
      metrics: [
        { label: "Type d'événement", val: 'MainSessionSignal (STARTUP)' },
        { label: 'Temps de boot total', val: '2.45 secondes' },
        { label: 'Beans initialisés', val: '142 beans' },
        { label: 'Statut de santé', val: 'UP (Database + Cache OK)' },
        { label: 'Cycle de vie', val: 'Auto-finalized upon readiness' },
      ],
    },
    test: {
      badgeText: 'TEST AUTOMATION',
      lines: [
        { time: '11:04:12.500', pillClass: 'pill-test', pillText: 'TEST_RUN', text: 'MainSessionType.TEST · Suite: [PaymentOrderIntegrationTest]' },
        { time: '11:04:12.650', pillClass: 'pill-success', pillText: 'MOCK_REST', text: 'WireMock interceptor: Mock payment gateway responded 200' },
        { time: '11:04:12.800', pillClass: 'pill-success', pillText: 'DB_TEST', text: 'H2 In-Memory DB: 12 rows asserted · Rollback on completion' },
        { time: '11:04:12.890', pillClass: 'pill-test', pillText: 'ASSERT_OK', text: 'Test passed without polluting production metrics database' },
      ],
      metrics: [
        { label: "Type d'événement", val: 'MainSessionSignal (TEST)' },
        { label: 'Contexte CI/CD', val: 'GitLab CI / Jenkins Runner #418' },
        { label: 'Assertions exécutées', val: '18 assertions validées' },
        { label: 'Isolation données', val: '100% séparé du flux PROD' },
        { label: 'Régression de perf', val: 'Aucune dérive (+1.2% vs baseline)' },
      ],
    },
  };

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

      const revealElements = this.el.nativeElement.querySelectorAll('.reveal');
      revealElements.forEach((element: Element) => observer.observe(element));

      const spySections = [
        { selector: '#monitoring-events', path: '/features/monitoring/events' },
        { selector: '#monitoring-contexts', path: '/features/monitoring/events' },
        { selector: '#monitoring-workflow', path: '/features/monitoring/events' },
        { selector: '#monitoring-comparison', path: '/features/monitoring/events' },
        { selector: '#monitoring-user', path: '/features/monitoring/events' },
      ];

      // Automatically activate and expand the section upon entering
      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/monitoring')) {
        this.scrollSpy.setActivePath('/features/monitoring/events');
      }

      this.scrollspyObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const match = spySections.find((s) => entry.target.matches(s.selector));
              if (match) {
                this.scrollSpy.setActivePath(match.path);
              }
            }
          }
        },
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
      );

      spySections.forEach(({ selector }) => {
        const el = this.el.nativeElement.querySelector(selector);
        if (el) this.scrollspyObserver?.observe(el);
      });

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        this.scrollspyObserver?.disconnect();
        this.scrollSpy.setActivePath(null);
      });
    }
  }

  setContext(context: ContextKey): void {
    this.selectedContext.set(context);
  }

  goToInstallation(): void {
    goToPage(this.isTransitioning(), this.router, '/installation');
  }

  goToArchitecture(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
  }

  goToCompatibilities(): void {
    goToPage(this.isTransitioning(), this.router, '/compatibilities');
  }
}
