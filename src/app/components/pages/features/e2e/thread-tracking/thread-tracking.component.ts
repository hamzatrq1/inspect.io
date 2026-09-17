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
  bootstrapCpuFill,
  bootstrapCheck2Circle,
  bootstrapLightningChargeFill,
  bootstrapShieldCheck,
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

export type ThreadScenarioKey = 'fork-join' | 'completable-future' | 'virtual-threads' | 'scheduled-executor';

export interface ThreadExecutionStep {
  time: string;
  threadName: string;
  threadType: 'MAIN' | 'WORKER' | 'VIRTUAL' | 'ASYNC';
  action: string;
  contextStatus: string;
  activeCount: number;
}

export interface ThreadScenarioData {
  badgeText: string;
  title: string;
  mechanism: string;
  steps: ThreadExecutionStep[];
  metrics: { label: string; val: string }[];
}

@Component({
  selector: 'app-thread-tracking',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapCpuFill,
      bootstrapCheck2Circle,
      bootstrapLightningChargeFill,
      bootstrapShieldCheck,
      hugeComputerProgramming01,
    }),
  ],
  templateUrl: './thread-tracking.component.html',
  styleUrls: ['./thread-tracking.component.scss'],
  standalone: true,
})
export class ThreadTrackingComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

  readonly selectedScenario = signal<ThreadScenarioKey>('fork-join');
  readonly isTransitioning = signal(false);

  readonly scenarios: Record<ThreadScenarioKey, ThreadScenarioData> = {
    'fork-join': {
      badgeText: 'PARALLEL FORK / JOIN',
      title: 'SessionContextManager.aroundCallable · ForkJoinPool',
      mechanism: 'Propagation ThreadLocal + Atomic ThreadCount Tracking',
      steps: [
        {
          time: '10:15:30.100',
          threadName: '#http-nio-8080-exec-1',
          threadType: 'MAIN',
          action: 'Requête HTTP entrante · Active session context created [ID: 9a2f-1102]',
          contextStatus: 'INITIALIZED',
          activeCount: 1,
        },
        {
          time: '10:15:30.115',
          threadName: '#ForkJoinPool.commonPool-worker-1',
          threadType: 'WORKER',
          action: 'aroundCallable(task1).call() · ThreadCountUp (+1) · Enrichissement catalogue',
          contextStatus: 'PROPAGATED',
          activeCount: 2,
        },
        {
          time: '10:15:30.116',
          threadName: '#ForkJoinPool.commonPool-worker-2',
          threadType: 'WORKER',
          action: 'aroundCallable(task2).call() · ThreadCountUp (+1) · Tarification dynamique',
          contextStatus: 'PROPAGATED',
          activeCount: 3,
        },
        {
          time: '10:15:30.145',
          threadName: '#ForkJoinPool.commonPool-worker-1',
          threadType: 'WORKER',
          action: 'task1 complete · ThreadCountDown (-1) · JDBC stage rattaché à session 9a2f',
          contextStatus: 'COMPLETED',
          activeCount: 2,
        },
        {
          time: '10:15:30.150',
          threadName: '#http-nio-8080-exec-1',
          threadType: 'MAIN',
          action: 'All workers joined · Aggregation complete · Session closed · ThreadCount = 0',
          contextStatus: 'FINALIZED',
          activeCount: 0,
        },
      ],
      metrics: [
        { label: 'Méthode d’encapsulation', val: 'aroundCallable / aroundRunnable' },
        { label: 'Pic de concurrence', val: '3 threads simultanés' },
        { label: 'Perte de contexte', val: '0% (Trace-ID préservé)' },
        { label: 'Gestion mémoire', val: 'ThreadLocal cleané dans finally' },
        { label: 'Compatibilité Pool', val: 'ForkJoinPool, ThreadPoolExecutor' },
      ],
    },
    'completable-future': {
      badgeText: 'COMPLETABLE FUTURE PIPELINE',
      title: 'InspectExecutor.exec() & wrap(ExecutorService)',
      mechanism: 'Chaînage asynchrone non-bloquant multi-stages',
      steps: [
        {
          time: '14:20:00.005',
          threadName: '#http-nio-8080-exec-7',
          threadType: 'MAIN',
          action: 'REST Controller initie CompletableFuture.supplyAsync() avec wrapper',
          contextStatus: 'ACTIVE',
          activeCount: 1,
        },
        {
          time: '14:20:00.012',
          threadName: '#inspect-async-pool-3',
          threadType: 'ASYNC',
          action: 'Stage 1 : Appel REST tiers (Banking API) · Latence 42ms',
          contextStatus: 'STAGE_INSPECTED',
          activeCount: 2,
        },
        {
          time: '14:20:00.056',
          threadName: '#inspect-async-pool-4',
          threadType: 'ASYNC',
          action: 'Stage 2 (thenApplyAsync) : Transformation JSON + Signature HMAC',
          contextStatus: 'STAGE_INSPECTED',
          activeCount: 2,
        },
        {
          time: '14:20:00.070',
          threadName: '#http-nio-8080-exec-7',
          threadType: 'MAIN',
          action: 'Response 200 OK envoyée · Durée totale 65ms · 2 stages corrélés',
          contextStatus: 'FINALIZED',
          activeCount: 0,
        },
      ],
      metrics: [
        { label: 'Pattern asynchrone', val: 'CompletableFuture.thenApplyAsync' },
        { label: 'Switches de threads', val: '3 passages de relais' },
        { label: 'Corrélation des stages', val: '100% rattachés au Root Span' },
        { label: 'Overhead inspecteur', val: '< 0.2 ms par switch' },
        { label: 'Sécurité asynchrone', val: 'Protection fuite mémoire active' },
      ],
    },
    'virtual-threads': {
      badgeText: 'JAVA 21 VIRTUAL THREADS (LOOM)',
      title: 'Lightweight Virtual Thread Executor',
      mechanism: 'Support natif des millions de Fibers / Virtual Threads',
      steps: [
        {
          time: '09:00:00.001',
          threadName: '#virtual-thread-240192',
          threadType: 'VIRTUAL',
          action: 'Virtual thread spawned on carrier thread ForkJoinPool-1-worker-3',
          contextStatus: 'SCOPED_VALUE_READY',
          activeCount: 1,
        },
        {
          time: '09:00:00.015',
          threadName: '#virtual-thread-240192',
          threadType: 'VIRTUAL',
          action: 'JDBC Blocking Query (PostgreSQL) · Carrier unmounted · Context preserved',
          contextStatus: 'YIELDED_SAFE',
          activeCount: 1,
        },
        {
          time: '09:00:00.035',
          threadName: '#virtual-thread-240192',
          threadType: 'VIRTUAL',
          action: 'Carrier remounted on ForkJoinPool-1-worker-7 · Query returned 42 rows',
          contextStatus: 'RESUMED_OK',
          activeCount: 1,
        },
        {
          time: '09:00:00.038',
          threadName: '#virtual-thread-240192',
          threadType: 'VIRTUAL',
          action: 'Virtual thread completed · 0 memory leaks · Trace exported to Hub',
          contextStatus: 'DISPATCHED',
          activeCount: 0,
        },
      ],
      metrics: [
        { label: 'Architecture', val: 'Java 21 Virtual Threads (Loom)' },
        { label: 'Carrier Thread Unmount', val: 'Zéro désynchronisation contexte' },
        { label: 'Capacité de scaling', val: '+100,000 threads concurrents' },
        { label: 'Empreinte mémoire', val: 'Ultra-légère (~1KB par thread)' },
        { label: 'Modernisation', val: 'ScopedValue & VirtualThread support' },
      ],
    },
    'scheduled-executor': {
      badgeText: 'CRON & SCHEDULED JOBS',
      title: 'ScheduledExecutorService & Spring @Scheduled',
      mechanism: 'Traçabilité périodique sans contexte HTTP web',
      steps: [
        {
          time: '04:00:00.000',
          threadName: '#scheduling-1',
          threadType: 'WORKER',
          action: '@Scheduled(cron = "0 0 4 * * ?") déclenche InventorySyncJob',
          contextStatus: 'BATCH_SESSION_INIT',
          activeCount: 1,
        },
        {
          time: '04:00:02.100',
          threadName: '#scheduling-1',
          threadType: 'WORKER',
          action: 'Inspection de 12,500 articles en base SQL · Commit par lots de 500',
          contextStatus: 'STAGE_PROGRESSED',
          activeCount: 1,
        },
        {
          time: '04:00:15.890',
          threadName: '#scheduling-1',
          threadType: 'WORKER',
          action: 'Purge des articles obsolètes · SFTP archive envoyée',
          contextStatus: 'STAGE_PROGRESSED',
          activeCount: 1,
        },
        {
          time: '04:00:18.400',
          threadName: '#scheduling-1',
          threadType: 'WORKER',
          action: 'Job terminé avec succès · MainSessionSignal(BATCH) clôturé',
          contextStatus: 'FINALIZED',
          activeCount: 0,
        },
      ],
      metrics: [
        { label: 'Contexte déclencheur', val: 'Background Cron Daemon' },
        { label: 'Durée du job', val: '18.4 secondes' },
        { label: 'Thread assigné', val: '#scheduling-1 (isolo)' },
        { label: 'Statut de traçabilité', val: '100% rattaché sans session HTTP' },
        { label: 'Historisation', val: 'Visible dans les dashboards BATCH' },
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
        { selector: '#thread-tracking-hero', path: '/features/e2e/thread' },
        { selector: '#thread-tracking-pillars', path: '/features/e2e/thread' },
        { selector: '#thread-tracking-deepdive', path: '/features/e2e/thread' },
        { selector: '#thread-tracking-comparison', path: '/features/e2e/thread' },
      ];

      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/e2e')) {
        this.scrollSpy.setActivePath('/features/e2e/thread');
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

  setScenario(scenario: ThreadScenarioKey): void {
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
