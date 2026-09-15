import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapTrash3Fill,
  bootstrapSliders2,
  bootstrapShieldCheck,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapHddStackFill,
  bootstrapRocketTakeoffFill,
  bootstrapSpeedometer2,
  bootstrapGearFill,
  bootstrapClockHistory,
  bootstrapCpuFill,
  bootstrapPiggyBankFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface RetentionPolicy {
  category: 'TECH' | 'FUNCT';
  title: string;
  configKey: string;
  defaultDays: number;
  currentDays: number;
  tablesTargeted: string[];
  rationale: string;
  dailyFreedVolume: string;
}

@Component({
  selector: 'app-smart-retention',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './smart-retention.component.html',
  styleUrls: ['./smart-retention.component.scss'],
  viewProviders: [
    provideIcons({
      bootstrapTrash3Fill,
      bootstrapSliders2,
      bootstrapShieldCheck,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapHddStackFill,
      bootstrapRocketTakeoffFill,
      bootstrapSpeedometer2,
      bootstrapGearFill,
      bootstrapClockHistory,
      bootstrapCpuFill,
      bootstrapPiggyBankFill,
    })
  ]
})
export class SmartRetentionComponent {
  selectedTab = signal<'policies' | 'virtual-threads' | 'metrics'>('policies');
  purgeSimulated = signal<boolean>(false);
  freedSpace = signal<string>('0 MB');
  lastPurgeTimestamp = signal<string>('Aujourd\'hui à 02:00:00 (Cron nocturne)');

  techDays = signal<number>(14);
  functDays = signal<number>(90);

  policies: RetentionPolicy[] = [
    {
      category: 'TECH',
      title: 'Télémétrie Technique Fine (JDBC, HTTP Headers, Payloads)',
      configKey: 'inspect.retention.technical-days',
      defaultDays: 14,
      currentDays: 14,
      tablesTargeted: ['REQ_JDBC', 'REQ_HTTP', 'REQ_LDAP', 'REQ_SMTP'],
      rationale: 'Nécessaire uniquement pour le debugging chaud. Volume très élevé (80% du stockage).',
      dailyFreedVolume: '18.4 GB / jour'
    },
    {
      category: 'FUNCT',
      title: 'Synthèses Métier & Sessions Fonctionnelles',
      configKey: 'inspect.retention.functional-days',
      defaultDays: 90,
      currentDays: 90,
      tablesTargeted: ['SES_HTTP', 'SES_MAIN', 'INSTANCE_TRACE'],
      rationale: 'Indispensable pour les audits légaux, SLAs, RGPD et statistiques de fréquentation.',
      dailyFreedVolume: '1.8 GB / jour'
    }
  ];

  constructor(private router: Router) {}

  updateTechDays(val: number): void {
    this.techDays.set(val);
  }

  updateFunctDays(val: number): void {
    this.functDays.set(val);
  }

  runPurgeDryRun(): void {
    this.purgeSimulated.set(true);
    setTimeout(() => {
      this.freedSpace.set('20.2 GB');
      this.lastPurgeTimestamp.set('À l\'instant (Via Virtual Threads Java 21)');
      this.purgeSimulated.set(false);
    }, 1000);
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
