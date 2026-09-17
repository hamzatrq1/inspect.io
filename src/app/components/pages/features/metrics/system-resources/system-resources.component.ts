import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapCpuFill,
  bootstrapHddStackFill,
  bootstrapDiagram3Fill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSpeedometer2,
  bootstrapActivity,
  bootstrapSliders2,
  bootstrapTrash3Fill,
  bootstrapSegmentedNav,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface JvmInstanceResource {
  instanceName: string;
  hostIp: string;
  cpuUsagePct: number;
  jvmHeapUsedMB: number;
  jvmHeapMaxMB: number;
  gcPauseAvgMs: number;
  activeThreads: number;
  virtualThreadsActive: number;
  hikariConnectionsActive: number;
  hikariConnectionsMax: number;
}

@Component({
  selector: 'app-system-resources',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './system-resources.component.html',
  styleUrls: ['./system-resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapCpuFill,
      bootstrapHddStackFill,
      bootstrapDiagram3Fill,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapSpeedometer2,
      bootstrapActivity,
      bootstrapSliders2,
      bootstrapTrash3Fill,
      bootstrapSegmentedNav,
    })
  ]
})
export class SystemResourcesComponent {
  selectedView = signal<'ALL' | 'JVM' | 'THREADS' | 'HIKARI'>('ALL');

  instances: JvmInstanceResource[] = [
    {
      instanceName: 'order-service-pod-79f8b',
      hostIp: '10.244.2.14',
      cpuUsagePct: 18.5,
      jvmHeapUsedMB: 1420,
      jvmHeapMaxMB: 4096,
      gcPauseAvgMs: 4.2,
      activeThreads: 142,
      virtualThreadsActive: 890,
      hikariConnectionsActive: 12,
      hikariConnectionsMax: 30
    },
    {
      instanceName: 'payment-service-pod-42a1c',
      hostIp: '10.244.3.88',
      cpuUsagePct: 42.1,
      jvmHeapUsedMB: 2890,
      jvmHeapMaxMB: 4096,
      gcPauseAvgMs: 12.8,
      activeThreads: 210,
      virtualThreadsActive: 1450,
      hikariConnectionsActive: 24,
      hikariConnectionsMax: 30
    },
    {
      instanceName: 'auth-service-pod-99d3e',
      hostIp: '10.244.1.05',
      cpuUsagePct: 8.2,
      jvmHeapUsedMB: 680,
      jvmHeapMaxMB: 2048,
      gcPauseAvgMs: 2.1,
      activeThreads: 68,
      virtualThreadsActive: 120,
      hikariConnectionsActive: 5,
      hikariConnectionsMax: 20
    }
  ];

  constructor(private router: Router) {}

  setView(v: 'ALL' | 'JVM' | 'THREADS' | 'HIKARI'): void {
    this.selectedView.set(v);
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
