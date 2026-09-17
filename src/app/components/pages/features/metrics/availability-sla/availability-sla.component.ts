import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapShieldCheck,
  bootstrapSpeedometer2,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapHeartPulseFill,
  bootstrapClockHistory,
  bootstrapActivity,
  bootstrapExclamationTriangleFill
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface ServiceSlaTarget {
  serviceName: string;
  slaTargetPct: number;
  currentUptimePct: number;
  budgetRemainingMinutes: number;
  errorRatePct: number;
  apdexScore: number;
  status: 'COMPLIANT' | 'AT_RISK' | 'BREACHED';
}

@Component({
  selector: 'app-availability-sla',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './availability-sla.component.html',
  styleUrls: ['./availability-sla.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapShieldCheck,
      bootstrapSpeedometer2,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapHeartPulseFill,
      bootstrapClockHistory,
      bootstrapActivity,
      bootstrapExclamationTriangleFill
    })
  ]
})
export class AvailabilitySlaComponent {
  selectedPeriod = signal<'30d' | '7d' | '24h'>('30d');

  services: ServiceSlaTarget[] = [
    {
      serviceName: 'Core Banking API Gateway',
      slaTargetPct: 99.95,
      currentUptimePct: 99.992,
      budgetRemainingMinutes: 18.2,
      errorRatePct: 0.008,
      apdexScore: 0.99,
      status: 'COMPLIANT'
    },
    {
      serviceName: 'Checkout & Payment Service',
      slaTargetPct: 99.90,
      currentUptimePct: 99.945,
      budgetRemainingMinutes: 14.5,
      errorRatePct: 0.045,
      apdexScore: 0.97,
      status: 'COMPLIANT'
    },
    {
      serviceName: 'Product Catalog & Search Engine',
      slaTargetPct: 99.50,
      currentUptimePct: 99.880,
      budgetRemainingMinutes: 142.0,
      errorRatePct: 0.09,
      apdexScore: 0.96,
      status: 'COMPLIANT'
    },
    {
      serviceName: 'Third-Party Partner Ingestion (SFTP)',
      slaTargetPct: 99.00,
      currentUptimePct: 98.920,
      budgetRemainingMinutes: 0.0,
      errorRatePct: 1.08,
      apdexScore: 0.88,
      status: 'BREACHED'
    }
  ];

  uptimeDays = [
    { day: 'J-29', status: 'OK' }, { day: 'J-28', status: 'OK' }, { day: 'J-27', status: 'OK' },
    { day: 'J-26', status: 'OK' }, { day: 'J-25', status: 'OK' }, { day: 'J-24', status: 'OK' },
    { day: 'J-23', status: 'OK' }, { day: 'J-22', status: 'OK' }, { day: 'J-21', status: 'OK' },
    { day: 'J-20', status: 'OK' }, { day: 'J-19', status: 'OK' }, { day: 'J-18', status: 'OK' },
    { day: 'J-17', status: 'OK' }, { day: 'J-16', status: 'OK' }, { day: 'J-15', status: 'OK' },
    { day: 'J-14', status: 'OK' }, { day: 'J-13', status: 'OK' }, { day: 'J-12', status: 'OK' },
    { day: 'J-11', status: 'OK' }, { day: 'J-10', status: 'OK' }, { day: 'J-9', status: 'OK' },
    { day: 'J-8', status: 'OK' },  { day: 'J-7', status: 'WARN' }, { day: 'J-6', status: 'OK' },
    { day: 'J-5', status: 'OK' },  { day: 'J-4', status: 'OK' },  { day: 'J-3', status: 'OK' },
    { day: 'J-2', status: 'OK' },  { day: 'J-1', status: 'OK' },  { day: 'Aujourd\'hui', status: 'OK' }
  ];

  constructor(private router: Router) {}

  setPeriod(p: '30d' | '7d' | '24h'): void {
    this.selectedPeriod.set(p);
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
