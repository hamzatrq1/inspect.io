import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapHddStackFill,
  bootstrapGit,
  bootstrapLayersFill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapCpuFill,
  bootstrapShieldCheck,
  bootstrapClockHistory,
  bootstrapGlobe,
  bootstrapTagFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface ApplicationInstanceRecord {
  appName: string;
  environment: 'PRODUCTION' | 'STAGING' | 'QA' | 'DEV';
  instancesCount: number;
  springBootVersion: string;
  javaVersion: string;
  gitBranch: string;
  gitCommitShort: string;
  buildTimestamp: string;
  activeProfile: string;
  status: 'UP' | 'OUTDATED' | 'MISMATCH';
}

@Component({
  selector: 'app-application-inventory',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './application-inventory.component.html',
  styleUrls: ['./application-inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapHddStackFill,
      bootstrapGit,
      bootstrapLayersFill,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapCpuFill,
      bootstrapShieldCheck,
      bootstrapClockHistory,
      bootstrapGlobe,
      bootstrapTagFill,
    })
  ]
})
export class ApplicationInventoryComponent {
  selectedEnvFilter = signal<'ALL' | 'PRODUCTION' | 'STAGING' | 'QA'>('ALL');

  inventoryRecords: ApplicationInstanceRecord[] = [
    {
      appName: 'order-service',
      environment: 'PRODUCTION',
      instancesCount: 6,
      springBootVersion: '3.3.4',
      javaVersion: 'OpenJDK 21.0.4',
      gitBranch: 'main',
      gitCommitShort: '9f8b41a',
      buildTimestamp: '2026-09-12 18:30',
      activeProfile: 'prod,k8s,cloud',
      status: 'UP'
    },
    {
      appName: 'payment-service',
      environment: 'PRODUCTION',
      instancesCount: 4,
      springBootVersion: '3.3.4',
      javaVersion: 'OpenJDK 21.0.4',
      gitBranch: 'main',
      gitCommitShort: '9f8b41a',
      buildTimestamp: '2026-09-12 18:30',
      activeProfile: 'prod,pci-dss',
      status: 'UP'
    },
    {
      appName: 'catalog-service',
      environment: 'PRODUCTION',
      instancesCount: 3,
      springBootVersion: '3.2.8',
      javaVersion: 'OpenJDK 17.0.10',
      gitBranch: 'hotfix/v1.4',
      gitCommitShort: 'e31b802',
      buildTimestamp: '2026-08-28 11:15',
      activeProfile: 'prod,redis',
      status: 'OUTDATED'
    },
    {
      appName: 'auth-service',
      environment: 'STAGING',
      instancesCount: 2,
      springBootVersion: '3.3.4',
      javaVersion: 'OpenJDK 21.0.4',
      gitBranch: 'release/v2.1',
      gitCommitShort: 'a12c84e',
      buildTimestamp: '2026-09-13 09:00',
      activeProfile: 'staging,mock-idp',
      status: 'UP'
    },
    {
      appName: 'analytics-worker',
      environment: 'QA',
      instancesCount: 2,
      springBootVersion: '3.3.0',
      javaVersion: 'OpenJDK 21.0.4',
      gitBranch: 'feature/spark-etl',
      gitCommitShort: '78cf120',
      buildTimestamp: '2026-09-11 16:40',
      activeProfile: 'qa,batch',
      status: 'MISMATCH'
    }
  ];

  constructor(private router: Router) {}

  setEnvFilter(env: 'ALL' | 'PRODUCTION' | 'STAGING' | 'QA'): void {
    this.selectedEnvFilter.set(env);
  }

  getFilteredRecords(): ApplicationInstanceRecord[] {
    const f = this.selectedEnvFilter();
    if (f === 'ALL') return this.inventoryRecords;
    return this.inventoryRecords.filter(r => r.environment === f);
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
