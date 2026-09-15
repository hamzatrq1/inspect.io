import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDiagram3Fill,
  bootstrapDatabaseFill,
  bootstrapEnvelopeFill,
  bootstrapFolderFill,
  bootstrapPeopleFill,
  bootstrapGlobe2,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapSpeedometer2,
  bootstrapClockHistory,
  bootstrapExclamationTriangleFill,
  bootstrapLayersFill
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface ProtocolDependency {
  protocol: 'JDBC' | 'REST' | 'LDAP' | 'SMTP' | 'FTP';
  targetSystem: string;
  totalCalls: number;
  avgDurationMs: number;
  p95DurationMs: number;
  errorRatePct: number;
  dataTransferred: string;
  status: 'HEALTHY' | 'DEGRADED' | 'WARNING';
}

interface WorkflowStage {
  stageName: string;
  protocol: 'JDBC' | 'REST' | 'LDAP' | 'SMTP' | 'FTP';
  durationMs: number;
  percentage: number;
  description: string;
}

@Component({
  selector: 'app-monitoring-workflow',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './monitoring-workflow.component.html',
  styleUrls: ['./monitoring-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapDiagram3Fill,
      bootstrapDatabaseFill,
      bootstrapEnvelopeFill,
      bootstrapFolderFill,
      bootstrapPeopleFill,
      bootstrapGlobe2,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapSpeedometer2,
      bootstrapClockHistory,
      bootstrapExclamationTriangleFill,
      bootstrapLayersFill
    })
  ]
})
export class MonitoringWorkflowComponent {
  selectedProtocol = signal<'ALL' | 'JDBC' | 'REST' | 'LDAP' | 'SMTP' | 'FTP'>('ALL');
  selectedWorkflowScenario = signal<'checkout-flow' | 'payroll-batch' | 'customer-auth'>('checkout-flow');

  dependencies: ProtocolDependency[] = [
    {
      protocol: 'JDBC',
      targetSystem: 'PostgreSQL OrderDB (HikariPool-1)',
      totalCalls: 184500,
      avgDurationMs: 4.2,
      p95DurationMs: 12.8,
      errorRatePct: 0.01,
      dataTransferred: '45.2 MB',
      status: 'HEALTHY'
    },
    {
      protocol: 'REST',
      targetSystem: 'Payment Gateway (Stripe v3 API)',
      totalCalls: 12400,
      avgDurationMs: 380.0,
      p95DurationMs: 740.0,
      errorRatePct: 1.2,
      dataTransferred: '8.4 MB',
      status: 'WARNING'
    },
    {
      protocol: 'LDAP',
      targetSystem: 'Active Directory Corporate (TLS:636)',
      totalCalls: 4500,
      avgDurationMs: 14.5,
      p95DurationMs: 28.0,
      errorRatePct: 0.0,
      dataTransferred: '1.2 MB',
      status: 'HEALTHY'
    },
    {
      protocol: 'SMTP',
      targetSystem: 'Mail Delivery Server (Postfix SMTP)',
      totalCalls: 8900,
      avgDurationMs: 65.0,
      p95DurationMs: 140.0,
      errorRatePct: 0.05,
      dataTransferred: '18.9 MB',
      status: 'HEALTHY'
    },
    {
      protocol: 'FTP',
      targetSystem: 'EDI Partner SFTP Dropzone',
      totalCalls: 120,
      avgDurationMs: 1240.0,
      p95DurationMs: 2900.0,
      errorRatePct: 3.5,
      dataTransferred: '1.4 GB',
      status: 'DEGRADED'
    }
  ];

  workflowScenarios = {
    'checkout-flow': {
      title: 'Flux de Commande & Facturation Synchrone',
      totalDurationMs: 468,
      stages: [
        { stageName: 'Auth & Contrôle Droits', protocol: 'LDAP', durationMs: 18, percentage: 3.8, description: 'Vérification jeton et annuaire d\'entreprise' },
        { stageName: 'Calcul Panier & Stock', protocol: 'JDBC', durationMs: 22, percentage: 4.7, description: '3 requêtes SQL préparées (HikariCP)' },
        { stageName: 'Autorisation Bancaire', protocol: 'REST', durationMs: 360, percentage: 76.9, description: 'Appel HTTPS externe vers la passerelle de paiement' },
        { stageName: 'Commit Commande DB', protocol: 'JDBC', durationMs: 14, percentage: 3.0, description: 'Insertion transactionnelle table ORDERS & ITEMS' },
        { stageName: 'Email Confirmation', protocol: 'SMTP', durationMs: 54, percentage: 11.5, description: 'Envoi asynchrone du reçu d\'achat' }
      ] as WorkflowStage[]
    },
    'payroll-batch': {
      title: 'Traitement de Paie & Dépôt Bancaire',
      totalDurationMs: 1650,
      stages: [
        { stageName: 'Extraction Employés', protocol: 'JDBC', durationMs: 85, percentage: 5.1, description: 'Scan table EMPLOYEES & CONTRACTS' },
        { stageName: 'Validation Comptes', protocol: 'REST', durationMs: 240, percentage: 14.5, description: 'Vérification IBAN via API interbancaire' },
        { stageName: 'Génération Fichiers SEPA', protocol: 'JDBC', durationMs: 45, percentage: 2.7, description: 'Enregistrement des lots de virements' },
        { stageName: 'Dépôt Sécurisé SFTP', protocol: 'FTP', durationMs: 1240, percentage: 75.2, description: 'Upload fichier XML chiffré sur serveur bancaire' },
        { stageName: 'Notification RH', protocol: 'SMTP', durationMs: 40, percentage: 2.4, description: 'Rapport d\'exécution envoyé aux administrateurs' }
      ] as WorkflowStage[]
    },
    'customer-auth': {
      title: 'Authentification & Chargement Profil SSO',
      totalDurationMs: 98,
      stages: [
        { stageName: 'Binding Annuaire', protocol: 'LDAP', durationMs: 28, percentage: 28.5, description: 'Recherche DN & mot de passe chiffré' },
        { stageName: 'Chargement Rôles SQL', protocol: 'JDBC', durationMs: 12, percentage: 12.2, description: 'Lecture des autorisations applicatives' },
        { stageName: 'Audit Trail Sécurité', protocol: 'REST', durationMs: 58, percentage: 59.2, description: 'Enregistrement connexion dans le SIEM central' }
      ] as WorkflowStage[]
    }
  };

  constructor(private router: Router) {}

  setProtocolFilter(p: 'ALL' | 'JDBC' | 'REST' | 'LDAP' | 'SMTP' | 'FTP'): void {
    this.selectedProtocol.set(p);
  }

  setScenario(s: 'checkout-flow' | 'payroll-batch' | 'customer-auth'): void {
    this.selectedWorkflowScenario.set(s);
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
