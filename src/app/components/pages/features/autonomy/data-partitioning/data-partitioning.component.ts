import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDatabaseFill,
  bootstrapCalendarCheckFill,
  bootstrapLightningChargeFill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapShieldCheck,
  bootstrapCpuFill,
  bootstrapHddStackFill,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapLayersFill,
  bootstrapClockHistory,
  bootstrapDiagram3Fill,
  bootstrapGearFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface PartitionInfo {
  tableName: string;
  partitionStrategy: 'MONTHLY' | 'DAILY';
  currentActivePartition: string;
  upcomingPartition: string;
  rowCount: string;
  storageSize: string;
  status: 'ACTIVE' | 'PRE-CREATED' | 'ARCHIVED';
  indexState: 'OPTIMAL' | 'REINDEXED';
}

@Component({
  selector: 'app-data-partitioning',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './data-partitioning.component.html',
  styleUrls: ['./data-partitioning.component.scss'],
  viewProviders: [
    provideIcons({
      bootstrapDatabaseFill,
      bootstrapCalendarCheckFill,
      bootstrapLightningChargeFill,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapShieldCheck,
      bootstrapCpuFill,
      bootstrapHddStackFill,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapLayersFill,
      bootstrapClockHistory,
      bootstrapDiagram3Fill,
      bootstrapGearFill,
    })
  ]
})
export class DataPartitioningComponent {
  selectedPeriod = signal<'2025_03' | '2025_04' | '2025_05'>('2025_04');
  simulationRunning = signal<boolean>(false);
  lastSchedulerRun = signal<string>('Aujourd\'hui à 00:00:02 (Succès)');

  tables: PartitionInfo[] = [
    {
      tableName: 'SES_HTTP',
      partitionStrategy: 'MONTHLY',
      currentActivePartition: 'SES_HTTP_2025_04',
      upcomingPartition: 'SES_HTTP_2025_05',
      rowCount: '48.2 M',
      storageSize: '14.2 GB',
      status: 'ACTIVE',
      indexState: 'OPTIMAL'
    },
    {
      tableName: 'REQ_HTTP',
      partitionStrategy: 'DAILY',
      currentActivePartition: 'REQ_HTTP_2025_04_15',
      upcomingPartition: 'REQ_HTTP_2025_04_16',
      rowCount: '182.6 M',
      storageSize: '62.8 GB',
      status: 'ACTIVE',
      indexState: 'OPTIMAL'
    },
    {
      tableName: 'REQ_JDBC',
      partitionStrategy: 'DAILY',
      currentActivePartition: 'REQ_JDBC_2025_04_15',
      upcomingPartition: 'REQ_JDBC_2025_04_16',
      rowCount: '345.1 M',
      storageSize: '89.4 GB',
      status: 'ACTIVE',
      indexState: 'OPTIMAL'
    },
    {
      tableName: 'INSTANCE_TRACE',
      partitionStrategy: 'MONTHLY',
      currentActivePartition: 'INSTANCE_TRACE_2025_04',
      upcomingPartition: 'INSTANCE_TRACE_2025_05',
      rowCount: '12.4 M',
      storageSize: '4.1 GB',
      status: 'ACTIVE',
      indexState: 'OPTIMAL'
    },
    {
      tableName: 'RESOURCE_USAGE',
      partitionStrategy: 'MONTHLY',
      currentActivePartition: 'RESOURCE_USAGE_2025_04',
      upcomingPartition: 'RESOURCE_USAGE_2025_05',
      rowCount: '8.7 M',
      storageSize: '2.3 GB',
      status: 'ACTIVE',
      indexState: 'OPTIMAL'
    }
  ];

  constructor(private router: Router) {}

  triggerSchedulerSimulation(): void {
    this.simulationRunning.set(true);
    setTimeout(() => {
      this.simulationRunning.set(false);
      this.lastSchedulerRun.set('À l\'instant (Partitions anticipées créées)');
    }, 1200);
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
