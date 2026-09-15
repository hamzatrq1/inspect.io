import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapActivity,
  bootstrapCpuFill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapShieldCheck,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapExclamationTriangleFill,
  bootstrapHddNetworkFill,
  bootstrapGraphUp,
  bootstrapPieChartFill,
  bootstrapHeartPulseFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface CollectorHealthState {
  collectorStatus: 'HEALTHY' | 'DEGRADED' | 'CIRCUIT_OPEN';
  queueCapacity: number;
  queueOccupancy: number;
  cpuOverheadPct: number;
  memoryOverheadMB: number;
  eventsDispatchedPerSec: number;
  circuitBreakerTripped: boolean;
  droppedEventsCount: number;
}

@Component({
  selector: 'app-self-reporting',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './self-reporting.component.html',
  styleUrls: ['./self-reporting.component.scss'],
  viewProviders: [
    provideIcons({
      bootstrapActivity,
      bootstrapCpuFill,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapShieldCheck,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapExclamationTriangleFill,
      bootstrapHddNetworkFill,
      bootstrapGraphUp,
      bootstrapPieChartFill,
      bootstrapHeartPulseFill,
    })
  ]
})
export class SelfReportingComponent {
  agentMode = signal<'NORMAL' | 'BURST' | 'BACKPRESSURE'>('NORMAL');

  collectorStates: Record<'NORMAL' | 'BURST' | 'BACKPRESSURE', CollectorHealthState> = {
    NORMAL: {
      collectorStatus: 'HEALTHY',
      queueCapacity: 50000,
      queueOccupancy: 420,
      cpuOverheadPct: 0.4,
      memoryOverheadMB: 12.8,
      eventsDispatchedPerSec: 2850,
      circuitBreakerTripped: false,
      droppedEventsCount: 0
    },
    BURST: {
      collectorStatus: 'HEALTHY',
      queueCapacity: 50000,
      queueOccupancy: 12840,
      cpuOverheadPct: 1.1,
      memoryOverheadMB: 28.4,
      eventsDispatchedPerSec: 18500,
      circuitBreakerTripped: false,
      droppedEventsCount: 0
    },
    BACKPRESSURE: {
      collectorStatus: 'DEGRADED',
      queueCapacity: 50000,
      queueOccupancy: 48900,
      cpuOverheadPct: 1.6,
      memoryOverheadMB: 48.0,
      eventsDispatchedPerSec: 25000,
      circuitBreakerTripped: true,
      droppedEventsCount: 140
    }
  };

  constructor(private router: Router) {}

  setMode(mode: 'NORMAL' | 'BURST' | 'BACKPRESSURE'): void {
    this.agentMode.set(mode);
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
