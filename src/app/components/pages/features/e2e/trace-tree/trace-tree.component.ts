import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
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
  bootstrapCheck2Circle,
  bootstrapSearch,
  bootstrapDiagram3Fill,
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

export type TraceScenarioKey = 'order-flow' | 'auth-oauth' | 'batch-sync' | 'fail-isolation';

export interface TraceTreeNode {
  id: string;
  depth: number;
  type: string;
  label: string;
  target: string;
  duration: string;
  status: 'success' | 'warn' | 'error' | 'info';
  statusBadge: string;
  threadName: string;
  details: string;
}

export interface ScenarioData {
  badgeText: string;
  rootTitle: string;
  totalDuration: string;
  nodesCount: number;
  nodes: TraceTreeNode[];
  metrics: { label: string; val: string }[];
}

@Component({
  selector: 'app-trace-tree',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapCheck2Circle,
      bootstrapSearch,
      bootstrapDiagram3Fill,
      hugeComputerProgramming01,
    }),
  ],
  templateUrl: './trace-tree.component.html',
  styleUrls: ['./trace-tree.component.scss'],
  standalone: true,
})
export class TraceTreeComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

  readonly selectedScenario = signal<TraceScenarioKey>('order-flow');
  readonly isTransitioning = signal(false);

  readonly scenarios: Record<TraceScenarioKey, ScenarioData> = {
    'order-flow': {
      badgeText: 'CHECKOUT E-COMMERCE',
      rootTitle: 'POST /api/v1/checkout/orders',
      totalDuration: '142 ms',
      nodesCount: 6,
      nodes: [
        {
          id: '1',
          depth: 0,
          type: 'HTTP REST',
          label: 'Client Gateway',
          target: 'POST /api/v1/checkout/orders',
          duration: '142 ms',
          status: 'success',
          statusBadge: '200 OK',
          threadName: '#http-nio-8080-exec-2',
          details: 'SessionContextManager initialized · Trace-ID: 7b84-ea19',
        },
        {
          id: '2',
          depth: 1,
          type: 'JDBC STAGE',
          label: 'Database Inventory',
          target: 'SELECT stock FROM inventory WHERE item_id = ? FOR UPDATE',
          duration: '14.2 ms',
          status: 'success',
          statusBadge: '14ms',
          threadName: '#http-nio-8080-exec-2',
          details: 'Connection pool HikariCP · 1 connection acquired',
        },
        {
          id: '3',
          depth: 1,
          type: 'REST CALL',
          label: 'Payment Gateway',
          target: 'POST https://banking.partner.io/v2/charge',
          duration: '88.5 ms',
          status: 'success',
          statusBadge: '201 CREATED',
          threadName: '#http-nio-8080-exec-2',
          details: 'TLS v1.3 Handshake · Headers correlation token injected',
        },
        {
          id: '4',
          depth: 2,
          type: 'ASYNC EVENT',
          label: 'Invoice Worker',
          target: 'InvoiceGenerationTask.run()',
          duration: '22.1 ms',
          status: 'success',
          statusBadge: 'COMPLETED',
          threadName: '#async-task-exec-8',
          details: 'aroundRunnable() context inherited · Parent UUID linked',
        },
        {
          id: '5',
          depth: 3,
          type: 'SFTP STAGE',
          label: 'Archiving SFTP',
          target: 'sftp://ged.internal.net/invoices/2026/09/INV-9842.pdf',
          duration: '12.4 ms',
          status: 'success',
          statusBadge: 'UPLOAD OK',
          threadName: '#async-task-exec-8',
          details: 'ChannelSftpWrapper · 342 KB stored',
        },
        {
          id: '6',
          depth: 1,
          type: 'SMTP STAGE',
          label: 'Confirmation Email',
          target: 'smtp.office365.com:587 · client@domain.com',
          duration: '16.8 ms',
          status: 'success',
          statusBadge: 'SENT',
          threadName: '#http-nio-8080-exec-2',
          details: 'TransportWrapper · Order confirmation template dispatched',
        },
      ],
      metrics: [
        { label: 'Profondeur d’arbre', val: '4 niveaux' },
        { label: 'Temps de réponse global', val: '142 ms' },
        { label: 'Services interrogés', val: '1 DB, 1 REST, 1 SFTP, 1 SMTP' },
        { label: 'Threads coordonnés', val: '2 (#nio-exec + #async-task)' },
        { label: 'Corrélation End-to-End', val: '100% sans perte de contexte' },
      ],
    },
    'auth-oauth': {
      badgeText: 'AUTHENTICATION OAUTH2 / LDAP',
      rootTitle: 'POST /oauth/token',
      totalDuration: '58 ms',
      nodesCount: 4,
      nodes: [
        {
          id: '1',
          depth: 0,
          type: 'HTTP REST',
          label: 'Security Filter',
          target: 'POST /oauth/token · grant_type=password',
          duration: '58 ms',
          status: 'success',
          statusBadge: '200 OK',
          threadName: '#http-nio-8080-exec-5',
          details: 'HttpSessionSignal · Bearer JWT creation',
        },
        {
          id: '2',
          depth: 1,
          type: 'LDAP STAGE',
          label: 'Active Directory',
          target: 'ldap://ad.corp.internal:389 · (sAMAccountName=j.dupont)',
          duration: '31.2 ms',
          status: 'success',
          statusBadge: 'BOUND',
          threadName: '#http-nio-8080-exec-5',
          details: 'DirectoryRequestMonitor · SSL StartTLS negotiation',
        },
        {
          id: '3',
          depth: 1,
          type: 'JDBC STAGE',
          label: 'User Roles & Scopes',
          target: 'SELECT role_code FROM user_roles WHERE user_id = ?',
          duration: '4.8 ms',
          status: 'success',
          statusBadge: '6 rows',
          threadName: '#http-nio-8080-exec-5',
          details: 'DatabaseRequestSignal · Cache warmed in Redis',
        },
        {
          id: '4',
          depth: 1,
          type: 'LOCAL EXEC',
          label: 'Token Signer RSA-256',
          target: 'JwtService.generateTokenPair()',
          duration: '2.1 ms',
          status: 'info',
          statusBadge: 'SIGNED',
          threadName: '#http-nio-8080-exec-5',
          details: 'LocalRequestSignal · Private Key hardware security module',
        },
      ],
      metrics: [
        { label: 'Profondeur d’arbre', val: '2 niveaux' },
        { label: 'Temps de réponse', val: '58 ms' },
        { label: 'Sécurité & protocoles', val: 'LDAP + TLS + RSA-256' },
        { label: 'Isolation contextuelle', val: 'ThreadLocal (#nio-exec-5)' },
        { label: 'Audit trail', val: 'Trace-ID certifié' },
      ],
    },
    'batch-sync': {
      badgeText: 'BATCH RECONCILIATION',
      rootTitle: 'MainSessionType.BATCH : DailyReconciliationJob',
      totalDuration: '1m 24s',
      nodesCount: 5,
      nodes: [
        {
          id: '1',
          depth: 0,
          type: 'BATCH SESSION',
          label: 'Master Job Scheduler',
          target: 'DailyReconciliationJob (Step 1/3)',
          duration: '1m 24s',
          status: 'success',
          statusBadge: 'COMPLETED',
          threadName: '#batch-job-scheduler-1',
          details: 'MainSessionSignal(BATCH) · 50,000 transactions',
        },
        {
          id: '2',
          depth: 1,
          type: 'JDBC STAGE',
          label: 'Bulk Cursor Reader',
          target: 'SELECT * FROM raw_records WHERE reconciled = FALSE',
          duration: '12.4 s',
          status: 'success',
          statusBadge: '50k records',
          threadName: '#batch-job-scheduler-1',
          details: 'Chunk processing (500 items/chunk) · HikariCP batch',
        },
        {
          id: '3',
          depth: 2,
          type: 'ASYNC WORKER',
          label: 'Parallel Validator #1..4',
          target: 'InspectExecutor.call(RecordValidator::validate)',
          duration: '45.1 s',
          status: 'success',
          statusBadge: '4x THREADS',
          threadName: '#inspect-worker-1..4',
          details: 'SessionContextManager.aroundCallable · Zero loss',
        },
        {
          id: '4',
          depth: 1,
          type: 'FTP EXPORT',
          label: 'Banking Partner SFTP',
          target: 'PUT /exports/reconciled_20260912.csv',
          duration: '18.2 s',
          status: 'warn',
          statusBadge: 'SFTP 12MB',
          threadName: '#batch-job-scheduler-1',
          details: 'FtpRequestSignal · SFTP throughput limited to 800 KB/s',
        },
        {
          id: '5',
          depth: 1,
          type: 'JDBC COMMIT',
          label: 'State Batch Update',
          target: 'UPDATE raw_records SET reconciled = TRUE WHERE batch_id = ?',
          duration: '8.3 s',
          status: 'success',
          statusBadge: 'COMMITTED',
          threadName: '#batch-job-scheduler-1',
          details: 'Transaction committed with 0 rollbacks',
        },
      ],
      metrics: [
        { label: 'Type de session', val: 'MainSession (BATCH)' },
        { label: 'Volume traité', val: '50,000 transactions' },
        { label: 'Parallélisme', val: '4 threads de calcul' },
        { label: 'I/O surveillées', val: 'JDBC + SFTP' },
        { label: 'Statut final', val: '100% SUCCÈS' },
      ],
    },
    'fail-isolation': {
      badgeText: 'ANOMALIE & ROOT CAUSE ISOLATION',
      rootTitle: 'POST /api/v1/orders/validate [ERROR]',
      totalDuration: '5,024 ms',
      nodesCount: 4,
      nodes: [
        {
          id: '1',
          depth: 0,
          type: 'HTTP REST',
          label: 'Order API Controller',
          target: 'POST /api/v1/orders/validate',
          duration: '5,024 ms',
          status: 'error',
          statusBadge: '504 TIMEOUT',
          threadName: '#http-nio-8080-exec-11',
          details: 'Exception caught : DownstreamServiceTimeoutException',
        },
        {
          id: '2',
          depth: 1,
          type: 'JDBC STAGE',
          label: 'Cart Cache Lookup',
          target: 'SELECT * FROM cart WHERE token = ?',
          duration: '2.1 ms',
          status: 'success',
          statusBadge: '200 OK',
          threadName: '#http-nio-8080-exec-11',
          details: 'DatabaseRequestSignal · Instant hit',
        },
        {
          id: '3',
          depth: 1,
          type: 'REST CALL',
          label: 'Legacy Anti-Fraud API',
          target: 'POST https://antifraud.legacy.net/check',
          duration: '5,001 ms',
          status: 'error',
          statusBadge: 'TIMEOUT (5s)',
          threadName: '#http-nio-8080-exec-11',
          details: 'Root Cause : java.net.SocketTimeoutException: Read timed out after 5000ms',
        },
        {
          id: '4',
          depth: 2,
          type: 'AUTO DIAG',
          label: 'INSPECT Root-Cause Pinpointer',
          target: 'TraceDispatcherHub.reportError()',
          duration: '0.4 ms',
          status: 'warn',
          statusBadge: 'PINPOINTED',
          threadName: '#http-nio-8080-exec-11',
          details: 'Branch 3 isolated : 99.5% du temps total passé dans Legacy Anti-Fraud API',
        },
      ],
      metrics: [
        { label: 'Diagnostic', val: 'Goulot externe identifié' },
        { label: 'Branche en faute', val: 'https://antifraud.legacy.net/check' },
        { label: 'Impact latence', val: '5,001ms (99.5% du total)' },
        { label: 'Temps d’identification', val: 'Immédiat (< 1s)' },
        { label: 'MTTR estimé', val: 'Divisé par 6' },
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
        { selector: '#trace-tree-hero', path: '/features/e2e/tree' },
        { selector: '#trace-tree-pillars', path: '/features/e2e/tree' },
        { selector: '#trace-tree-deepdive', path: '/features/e2e/tree' },
        { selector: '#trace-tree-comparison', path: '/features/e2e/tree' },
      ];

      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/e2e')) {
        this.scrollSpy.setActivePath('/features/e2e/tree');
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

  setScenario(scenario: TraceScenarioKey): void {
    this.selectedScenario.set(scenario);
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
