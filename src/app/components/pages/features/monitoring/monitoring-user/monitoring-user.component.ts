import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapPersonBoundingBox,
  bootstrapDiagram3Fill,
  bootstrapSpeedometer2,
  bootstrapShieldCheck,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapFunnelFill,
  bootstrapCursorFill,
  bootstrapClockHistory,
  bootstrapExclamationTriangleFill,
  bootstrapGraphUpArrow
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface FunnelStep {
  id: string;
  stepName: string;
  endpoint: string;
  usersCount: number;
  conversionPct: number;
  avgDurationMs: number;
  errorRatePct: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
}

interface UserSessionEvent {
  time: string;
  action: string;
  durationMs: number;
  payloadKb: number;
  state: 'SUCCESS' | 'WARNING' | 'ERROR';
}

@Component({
  selector: 'app-monitoring-user',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './monitoring-user.component.html',
  styleUrls: ['./monitoring-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapPersonBoundingBox,
      bootstrapDiagram3Fill,
      bootstrapSpeedometer2,
      bootstrapShieldCheck,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapFunnelFill,
      bootstrapCursorFill,
      bootstrapClockHistory,
      bootstrapExclamationTriangleFill,
      bootstrapGraphUpArrow
    })
  ]
})
export class MonitoringUserComponent {
  selectedCohort = signal<'ecommerce-checkout' | 'onboarding-kyc' | 'b2b-contract'>('ecommerce-checkout');
  selectedUserSession = signal<string>('usr_849202_paris');

  cohorts = {
    'ecommerce-checkout': {
      title: 'Parcours Achat & Paiement Panier (B2C)',
      totalVisitors: 45200,
      completionRate: '78.4%',
      avgJourneyDuration: '2m 14s',
      dropOffBottleneck: 'Étape 3 : Validation 3D-Secure',
      steps: [
        { id: '1', stepName: 'Catalogue & Sélection Produit', endpoint: 'GET /api/catalog/items', usersCount: 45200, conversionPct: 100, avgDurationMs: 42, errorRatePct: 0.02, status: 'OPTIMAL' },
        { id: '2', stepName: 'Ajout Panier & Calcul Frais', endpoint: 'POST /api/cart/checkout', usersCount: 39800, conversionPct: 88.0, avgDurationMs: 110, errorRatePct: 0.1, status: 'OPTIMAL' },
        { id: '3', stepName: 'Appel Passerelle Bancaire 3DS', endpoint: 'POST /api/payment/authorize', usersCount: 36200, conversionPct: 80.1, avgDurationMs: 820, errorRatePct: 2.8, status: 'WARNING' },
        { id: '4', stepName: 'Confirmation Commande & Facture', endpoint: 'POST /api/order/complete', usersCount: 35436, conversionPct: 78.4, avgDurationMs: 95, errorRatePct: 0.05, status: 'OPTIMAL' }
      ] as FunnelStep[]
    },
    'onboarding-kyc': {
      title: 'Souscription Bancaire & Vérification KYC',
      totalVisitors: 12400,
      completionRate: '64.2%',
      avgJourneyDuration: '4m 30s',
      dropOffBottleneck: 'Étape 2 : OCR Pièce d\'Identité',
      steps: [
        { id: '1', stepName: 'Formulaire Coordonnées', endpoint: 'POST /api/kyc/init', usersCount: 12400, conversionPct: 100, avgDurationMs: 50, errorRatePct: 0.01, status: 'OPTIMAL' },
        { id: '2', stepName: 'Upload & Reconnaissance OCR', endpoint: 'POST /api/kyc/upload-doc', usersCount: 8900, conversionPct: 71.7, avgDurationMs: 1450, errorRatePct: 4.1, status: 'CRITICAL' },
        { id: '3', stepName: 'Signature Électronique eIDAS', endpoint: 'POST /api/signature/cert', usersCount: 8120, conversionPct: 65.4, avgDurationMs: 340, errorRatePct: 0.5, status: 'OPTIMAL' },
        { id: '4', stepName: 'Activation du Compte', endpoint: 'POST /api/account/activate', usersCount: 7960, conversionPct: 64.2, avgDurationMs: 120, errorRatePct: 0.02, status: 'OPTIMAL' }
      ] as FunnelStep[]
    },
    'b2b-contract': {
      title: 'Génération & Validation Devis Grand Compte',
      totalVisitors: 3100,
      completionRate: '91.8%',
      avgJourneyDuration: '1m 15s',
      dropOffBottleneck: 'Étape 2 : Calcul de Remise Complexe',
      steps: [
        { id: '1', stepName: 'Sélection Grille Tarifaire', endpoint: 'GET /api/b2b/pricing', usersCount: 3100, conversionPct: 100, avgDurationMs: 35, errorRatePct: 0.0, status: 'OPTIMAL' },
        { id: '2', stepName: 'Moteur de Règles & Remises', endpoint: 'POST /api/b2b/quote-calc', usersCount: 2950, conversionPct: 95.1, avgDurationMs: 480, errorRatePct: 0.8, status: 'OPTIMAL' },
        { id: '3', stepName: 'Validation Workflow Manager', endpoint: 'POST /api/b2b/approval', usersCount: 2845, conversionPct: 91.8, avgDurationMs: 85, errorRatePct: 0.0, status: 'OPTIMAL' }
      ] as FunnelStep[]
    }
  };

  userJourneyEvents: UserSessionEvent[] = [
    { time: '14:22:01', action: 'Authentification JWT (OAuth2 SSO)', durationMs: 48, payloadKb: 1.4, state: 'SUCCESS' },
    { time: '14:22:15', action: 'Chargement Vue Dashboard Utilisateur', durationMs: 72, payloadKb: 8.2, state: 'SUCCESS' },
    { time: '14:22:42', action: 'Requête Recherche /api/catalog?q=pro', durationMs: 110, payloadKb: 45.1, state: 'SUCCESS' },
    { time: '14:23:05', action: 'Ajout Panier #89302', durationMs: 85, payloadKb: 2.1, state: 'SUCCESS' },
    { time: '14:23:18', action: 'Vérification Stock Entrepôt JDBC', durationMs: 24, payloadKb: 0.8, state: 'SUCCESS' },
    { time: '14:23:30', action: 'Appel Passerelle Paiement Stripe', durationMs: 780, payloadKb: 3.4, state: 'WARNING' },
    { time: '14:23:32', action: 'Émission Facture PDF & Notification', durationMs: 95, payloadKb: 120.4, state: 'SUCCESS' }
  ];

  constructor(private router: Router) {}

  setCohort(key: 'ecommerce-checkout' | 'onboarding-kyc' | 'b2b-contract'): void {
    this.selectedCohort.set(key);
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
