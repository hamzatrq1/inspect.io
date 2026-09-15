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
  bootstrapBarChartLineFill,
  bootstrapCheck2Circle,
  bootstrapActivity,
  bootstrapLightningChargeFill,
  bootstrapSliders2,
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

export type TrafficScenarioKey = 'nominal' | 'black-friday' | 'batch-mass' | 'ddos-stress';

export interface TrafficDataPoint {
  time: string;
  rps: number;
  dataTransferKbps: number;
  activeInstances: number;
  errorRatePct: number;
}

export interface VolumeScenarioData {
  badgeText: string;
  title: string;
  currentRps: string;
  totalRequestsPerHour: string;
  bandwidthMBs: string;
  clusterScale: string;
  trafficPoints: TrafficDataPoint[];
  metrics: { label: string; val: string }[];
}

@Component({
  selector: 'app-volume-throughput',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapBarChartLineFill,
      bootstrapCheck2Circle,
      bootstrapActivity,
      bootstrapLightningChargeFill,
      bootstrapSliders2,
      hugeComputerProgramming01,
    }),
  ],
  templateUrl: './volume-throughput.component.html',
  styleUrls: ['./volume-throughput.component.scss'],
  standalone: true,
})
export class VolumeThroughputComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

  readonly selectedScenario = signal<TrafficScenarioKey>('nominal');
  readonly isTransitioning = signal(false);

  readonly scenarios: Record<TrafficScenarioKey, VolumeScenarioData> = {
    nominal: {
      badgeText: 'TRAFIC NOMINAL (PRODUCTION)',
      title: 'Trafic de croisière régulier',
      currentRps: '850 RPS',
      totalRequestsPerHour: '3.06 M req/h',
      bandwidthMBs: '14.2 MB/s',
      clusterScale: '3 Pods Kubernetes',
      trafficPoints: [
        { time: '14:00', rps: 720, dataTransferKbps: 11200, activeInstances: 3, errorRatePct: 0.01 },
        { time: '14:15', rps: 810, dataTransferKbps: 13400, activeInstances: 3, errorRatePct: 0.02 },
        { time: '14:30', rps: 850, dataTransferKbps: 14200, activeInstances: 3, errorRatePct: 0.01 },
        { time: '14:45', rps: 890, dataTransferKbps: 15100, activeInstances: 3, errorRatePct: 0.02 },
        { time: '15:00', rps: 830, dataTransferKbps: 13900, activeInstances: 3, errorRatePct: 0.01 },
      ],
      metrics: [
        { label: 'Débit moyen soutenu', val: '850 requêtes/sec' },
        { label: 'Volume horaire', val: '3.06 millions req/h' },
        { label: 'Taux d’erreur HTTP 5xx', val: '< 0.02%' },
        { label: 'Capacité réserve cluster', val: '65% CPU disponible' },
        { label: 'Collecte télémétrique', val: '100% sans dropped frames' },
      ],
    },
    'black-friday': {
      badgeText: 'PIC DE CHARGE · BLACK FRIDAY',
      title: 'Montée en charge x8 (Burst Shopping)',
      currentRps: '6,400 RPS',
      totalRequestsPerHour: '23.04 M req/h',
      bandwidthMBs: '112.8 MB/s',
      clusterScale: '12 Pods (Auto-Scaled HPA)',
      trafficPoints: [
        { time: '19:00', rps: 1200, dataTransferKbps: 19800, activeInstances: 3, errorRatePct: 0.02 },
        { time: '19:15', rps: 3400, dataTransferKbps: 58000, activeInstances: 6, errorRatePct: 0.04 },
        { time: '19:30', rps: 5800, dataTransferKbps: 98400, activeInstances: 10, errorRatePct: 0.08 },
        { time: '19:45', rps: 6400, dataTransferKbps: 112800, activeInstances: 12, errorRatePct: 0.09 },
        { time: '20:00', rps: 6200, dataTransferKbps: 109000, activeInstances: 12, errorRatePct: 0.05 },
      ],
      metrics: [
        { label: 'Pic de débit atteint', val: '6,400 requêtes/sec' },
        { label: 'Volume horaire', val: '23 millions req/h' },
        { label: 'Auto-scaling dynamique', val: 'Passage 3 → 12 Pods' },
        { label: 'File d’attente DispatchHub', val: 'Buffering fluide (0 overflow)' },
        { label: 'Latence p99 maintenue', val: '48 ms (stable)' },
      ],
    },
    'batch-mass': {
      badgeText: 'SYNCHRONISATION MASSIVE (BATCH)',
      title: 'Débit par chunks de 1,000 enregistrements',
      currentRps: '15,000 rec/s',
      totalRequestsPerHour: '54.0 M lignes/h',
      bandwidthMBs: '85.4 MB/s',
      clusterScale: 'Batch Dedicated Worker',
      trafficPoints: [
        { time: '02:00', rps: 8000, dataTransferKbps: 42000, activeInstances: 1, errorRatePct: 0.0 },
        { time: '02:15', rps: 14500, dataTransferKbps: 79000, activeInstances: 1, errorRatePct: 0.0 },
        { time: '02:30', rps: 15000, dataTransferKbps: 85400, activeInstances: 1, errorRatePct: 0.0 },
        { time: '02:45', rps: 15000, dataTransferKbps: 85400, activeInstances: 1, errorRatePct: 0.0 },
        { time: '03:00', rps: 3000, dataTransferKbps: 16000, activeInstances: 1, errorRatePct: 0.0 },
      ],
      metrics: [
        { label: 'Débit d’ingestion', val: '15,000 records/sec' },
        { label: 'Volume global injecté', val: '54 millions de lignes' },
        { label: 'Taille des chunks', val: '1,000 items / commit SQL' },
        { label: 'Taux de commit SQL', val: '100% intégrité validée' },
        { label: 'Impact CPU collecteur', val: '< 1.2% du thread batch' },
      ],
    },
    'ddos-stress': {
      badgeText: 'STRESS TEST & SURCHARGE',
      title: 'Simulation d’injection 25,000 RPS',
      currentRps: '25,000 RPS',
      totalRequestsPerHour: '90.0 M req/h',
      bandwidthMBs: '340.0 MB/s',
      clusterScale: 'Circuit Breakers Triggered',
      trafficPoints: [
        { time: '11:00', rps: 5000, dataTransferKbps: 65000, activeInstances: 12, errorRatePct: 0.1 },
        { time: '11:05', rps: 15000, dataTransferKbps: 195000, activeInstances: 20, errorRatePct: 1.2 },
        { time: '11:10', rps: 25000, dataTransferKbps: 340000, activeInstances: 24, errorRatePct: 4.8 },
        { time: '11:15', rps: 25000, dataTransferKbps: 340000, activeInstances: 24, errorRatePct: 3.5 },
        { time: '11:20', rps: 18000, dataTransferKbps: 240000, activeInstances: 20, errorRatePct: 0.8 },
      ],
      metrics: [
        { label: 'Charge maximale testée', val: '25,000 requêtes/sec' },
        { label: 'Volume horaire équivalent', val: '90 millions req/h' },
        { label: 'Protection anti-débordement', val: 'ProcessingQueue Circuit Active' },
        { label: 'Application métier', val: '0 crash JVM / 0 thread lock' },
        { label: 'Temps de recovery', val: '< 2 secondes post-burst' },
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
        { selector: '#volume-hero', path: '/features/metrics/volume' },
        { selector: '#volume-concept', path: '/features/metrics/volume' },
        { selector: '#volume-value', path: '/features/metrics/volume' },
      ];

      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/metrics')) {
        this.scrollSpy.setActivePath('/features/metrics/volume');
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

  setScenario(scenario: TrafficScenarioKey): void {
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
