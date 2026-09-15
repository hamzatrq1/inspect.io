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
  bootstrapSpeedometer2,
  bootstrapCheck2Circle,
  bootstrapGraphUp,
  bootstrapHourglassSplit,
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

export type PerformanceScenarioKey = 'optimal' | 'db-slow' | 'external-bottleneck' | 'cpu-intensive';

export interface LatencyBreakdownStage {
  name: string;
  durationMs: number;
  percentage: number;
  colorClass: string;
  stageType: string;
}

export interface PerformanceScenarioData {
  badgeText: string;
  endpoint: string;
  p50: string;
  p90: string;
  p95: string;
  p99: string;
  totalDurationMs: number;
  stages: LatencyBreakdownStage[];
  diagnosis: string;
  metrics: { label: string; val: string }[];
}

@Component({
  selector: 'app-performance-response',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapSpeedometer2,
      bootstrapCheck2Circle,
      bootstrapGraphUp,
      bootstrapHourglassSplit,
      hugeComputerProgramming01,
    }),
  ],
  templateUrl: './performance-response.component.html',
  styleUrls: ['./performance-response.component.scss'],
  standalone: true,
})
export class PerformanceResponseComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

  readonly selectedScenario = signal<PerformanceScenarioKey>('optimal');
  readonly isTransitioning = signal(false);

  readonly scenarios: Record<PerformanceScenarioKey, PerformanceScenarioData> = {
    optimal: {
      badgeText: 'SLA RESPECTÉ · OPTIMAL',
      endpoint: 'GET /api/v1/products/catalog',
      p50: '12 ms',
      p90: '18 ms',
      p95: '24 ms',
      p99: '35 ms',
      totalDurationMs: 24,
      stages: [
        { name: 'Filtres Sécurité & JWT', durationMs: 2, percentage: 8, colorClass: 'bar-indigo', stageType: 'Security' },
        { name: 'Cache Redis Warm Hit', durationMs: 3, percentage: 13, colorClass: 'bar-cyan', stageType: 'Cache' },
        { name: 'JDBC Read (Index Hit)', durationMs: 8, percentage: 33, colorClass: 'bar-emerald', stageType: 'Database' },
        { name: 'DTO Mapping & JSON Serializer', durationMs: 11, percentage: 46, colorClass: 'bar-blue', stageType: 'Compute' },
      ],
      diagnosis: 'Performance nominale. 100% des requêtes sous le seuil SLA de 50ms.',
      metrics: [
        { label: 'Indice de santé SLA', val: '99.98% respecté' },
        { label: 'Percentile médian p50', val: '12 ms' },
        { label: 'Worst-case p99', val: '35 ms' },
        { label: 'Goulot principal', val: 'Aucun (Équilibré)' },
        { label: 'Overhead agent', val: '< 0.3 ms' },
      ],
    },
    'db-slow': {
      badgeText: 'GOULOT BASE DE DONNÉES (JDBC)',
      endpoint: 'GET /api/v1/reports/monthly-summary',
      p50: '450 ms',
      p90: '1,200 ms',
      p95: '2,100 ms',
      p99: '4,800 ms',
      totalDurationMs: 2100,
      stages: [
        { name: 'Attente Pool HikariCP', durationMs: 380, percentage: 18, colorClass: 'bar-amber', stageType: 'Pool Wait' },
        { name: 'JDBC Full Table Scan', durationMs: 1540, percentage: 73, colorClass: 'bar-red', stageType: 'Database' },
        { name: 'Traitement Hibernate JPA', durationMs: 120, percentage: 6, colorClass: 'bar-indigo', stageType: 'ORM' },
        { name: 'Sérialisation REST', durationMs: 60, percentage: 3, colorClass: 'bar-blue', stageType: 'Compute' },
      ],
      diagnosis: 'Alerte SQL : Absence d’index composite sur la table (date_creation, tenant_id). 73% du temps passé en lecture disque.',
      metrics: [
        { label: 'Indice de santé SLA', val: 'Dégradé (SLA > 1s)' },
        { label: 'Percentile médian p50', val: '450 ms' },
        { label: 'Worst-case p99', val: '4,800 ms' },
        { label: 'Goulot principal', val: 'JDBC Request Monitor (73%)' },
        { label: 'Action recommandée', val: 'Ajout index + Tuning Pool' },
      ],
    },
    'external-bottleneck': {
      badgeText: 'DÉPENDANCE TIERS EN PANNE',
      endpoint: 'POST /api/v1/payments/verify-3ds',
      p50: '820 ms',
      p90: '3,400 ms',
      p95: '5,000 ms',
      p99: '8,200 ms',
      totalDurationMs: 5000,
      stages: [
        { name: 'Requête Entrante & Validations', durationMs: 15, percentage: 1, colorClass: 'bar-indigo', stageType: 'Local' },
        { name: 'Appel REST Partenaire (3DSecure)', durationMs: 4850, percentage: 97, colorClass: 'bar-red', stageType: 'Downstream REST' },
        { name: 'Journalisation Audit DB', durationMs: 35, percentage: 1, colorClass: 'bar-emerald', stageType: 'Database' },
        { name: 'Formatage Réponse', durationMs: 100, percentage: 1, colorClass: 'bar-blue', stageType: 'Compute' },
      ],
      diagnosis: 'Défaillance externe : Le fournisseur de paiement tiers accuse une latence moyenne de 4.8s. Circuit breaker recommandé.',
      metrics: [
        { label: 'Indice de santé SLA', val: 'Critique (Tiers externe)' },
        { label: 'Percentile médian p50', val: '820 ms' },
        { label: 'Worst-case p99', val: '8,200 ms' },
        { label: 'Goulot principal', val: 'HttpRequestMonitor (97%)' },
        { label: 'Action recommandée', val: 'Activer Fallback / CircuitBreaker' },
      ],
    },
    'cpu-intensive': {
      badgeText: 'CALCUL CPU & SÉRIALISATION',
      endpoint: 'POST /api/v1/export/pdf-generator',
      p50: '320 ms',
      p90: '680 ms',
      p95: '950 ms',
      p99: '1,450 ms',
      totalDurationMs: 950,
      stages: [
        { name: 'Récupération Données SQL', durationMs: 65, percentage: 7, colorClass: 'bar-emerald', stageType: 'Database' },
        { name: 'Génération Moteur PDF (iText/FOP)', durationMs: 720, percentage: 76, colorClass: 'bar-purple', stageType: 'CPU Bound' },
        { name: 'Compression GZIP', durationMs: 115, percentage: 12, colorClass: 'bar-cyan', stageType: 'Compression' },
        { name: 'Émission Flux Stream', durationMs: 50, percentage: 5, colorClass: 'bar-blue', stageType: 'Network' },
      ],
      diagnosis: 'Traitement CPU Bound. Consommation de cycles CPU intensive pendant le rendu vectoriel du PDF.',
      metrics: [
        { label: 'Indice de santé SLA', val: 'Conforme au dimensionnement' },
        { label: 'Percentile médian p50', val: '320 ms' },
        { label: 'Worst-case p99', val: '1,450 ms' },
        { label: 'Goulot principal', val: 'Local Execution (76% CPU)' },
        { label: 'Action recommandée', val: 'Délégation worker asynchrone' },
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
        { selector: '#perf-response-hero', path: '/features/metrics/performance' },
        { selector: '#perf-response-concept', path: '/features/metrics/performance' },
        { selector: '#perf-response-value', path: '/features/metrics/performance' },
      ];

      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/metrics')) {
        this.scrollSpy.setActivePath('/features/metrics/performance');
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

  setScenario(scenario: PerformanceScenarioKey): void {
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
