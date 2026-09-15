import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapCalendarEventFill,
  bootstrapClockHistory,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapArrowRepeat,
  bootstrapShieldCheck,
  bootstrapActivity,
  bootstrapExclamationTriangleFill,
  bootstrapGit,
  bootstrapDiagram2Fill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface LifecycleEventRecord {
  id: string;
  timestamp: string;
  eventType: 'STARTUP' | 'SHUTDOWN' | 'DEPLOYMENT' | 'CRASH_RECOVERY' | 'CONFIG_RELOAD';
  serviceName: string;
  environment: string;
  version: string;
  gitCommit: string;
  durationBootMs?: number;
  authorOrTrigger: string;
  summary: string;
}

@Component({
  selector: 'app-lifecycle-events',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './lifecycle-events.component.html',
  styleUrls: ['./lifecycle-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapCalendarEventFill,
      bootstrapClockHistory,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapArrowRepeat,
      bootstrapShieldCheck,
      bootstrapActivity,
      bootstrapExclamationTriangleFill,
      bootstrapGit,
      bootstrapDiagram2Fill,
    })
  ]
})
export class LifecycleEventsComponent {
  selectedEventType = signal<'ALL' | 'DEPLOYMENT' | 'STARTUP' | 'CRASH_RECOVERY'>('ALL');

  events: LifecycleEventRecord[] = [
    {
      id: 'EVT-9042',
      timestamp: 'Aujourd\'hui à 14:15:02',
      eventType: 'DEPLOYMENT',
      serviceName: 'order-service',
      environment: 'PRODUCTION',
      version: 'v2.4.0',
      gitCommit: '9f8b41a',
      durationBootMs: 3420,
      authorOrTrigger: 'CI/CD Pipeline #892',
      summary: 'Déploiement Rolling Update (6 pods). Montée de version sans interruption.'
    },
    {
      id: 'EVT-9041',
      timestamp: 'Aujourd\'hui à 11:30:14',
      eventType: 'CONFIG_RELOAD',
      serviceName: 'payment-service',
      environment: 'PRODUCTION',
      version: 'v2.3.8',
      gitCommit: '38a1c90',
      authorOrTrigger: 'Spring Cloud Config Bus',
      summary: 'Actualisation à chaud du timeout Stripe (2500ms → 4000ms).'
    },
    {
      id: 'EVT-9040',
      timestamp: 'Hier à 22:45:10',
      eventType: 'CRASH_RECOVERY',
      serviceName: 'analytics-worker',
      environment: 'PRODUCTION',
      version: 'v1.9.2',
      gitCommit: 'd48291f',
      durationBootMs: 5120,
      authorOrTrigger: 'K8s OOMKiller restart',
      summary: 'Redémarrage automatique après pic mémoire sur batch nocturne.'
    },
    {
      id: 'EVT-9039',
      timestamp: '11/09/2026 à 09:00:00',
      eventType: 'STARTUP',
      serviceName: 'auth-service',
      environment: 'PRODUCTION',
      version: 'v2.1.0',
      gitCommit: 'a12c84e',
      durationBootMs: 2890,
      authorOrTrigger: 'HPA Scale Out (+2 pods)',
      summary: 'Auto-scaling dynamique suite à augmentation du trafic matinal.'
    },
    {
      id: 'EVT-9038',
      timestamp: '10/09/2026 à 18:20:00',
      eventType: 'SHUTDOWN',
      serviceName: 'catalog-service',
      environment: 'STAGING',
      version: 'v1.4.1',
      gitCommit: 'e31b802',
      authorOrTrigger: 'Graceful Shutdown (SIGTERM)',
      summary: 'Extinction propre après traitement des requêtes en vol.'
    }
  ];

  constructor(private router: Router) {}

  setFilter(type: 'ALL' | 'DEPLOYMENT' | 'STARTUP' | 'CRASH_RECOVERY'): void {
    this.selectedEventType.set(type);
  }

  getFilteredEvents(): LifecycleEventRecord[] {
    const f = this.selectedEventType();
    if (f === 'ALL') return this.events;
    return this.events.filter(e => e.eventType === f);
  }

  goToInstallation(): void {
    this.router.navigate(['/guide/installation']);
  }

  goToArchitecture(): void {
    this.router.navigate(['/architecture/overview']);
  }

  goToCompatibilities(): void {
    this.router.navigate(['/guide/compatibilities']);
  }
}
