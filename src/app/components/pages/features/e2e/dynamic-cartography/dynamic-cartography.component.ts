import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDiagram3Fill,
  bootstrapHddNetworkFill,
  bootstrapDatabaseFill,
  bootstrapGlobe2,
  bootstrapShieldCheck,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSpeedometer2,
  bootstrapCloudCheckFill,
  bootstrapCpuFill,
  bootstrapActivity
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

interface TopologyNode {
  id: string;
  label: string;
  category: 'GATEWAY' | 'SERVICE' | 'DATABASE' | 'BROKER' | 'EXTERNAL';
  instancesCount: number;
  avgLatencyMs: number;
  rps: number;
  errorRatePct: number;
  health: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

interface TopologyLink {
  from: string;
  to: string;
  protocol: string;
  trafficVolumeRps: number;
  latencyMs: number;
}

@Component({
  selector: 'app-dynamic-cartography',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './dynamic-cartography.component.html',
  styleUrls: ['./dynamic-cartography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapDiagram3Fill,
      bootstrapHddNetworkFill,
      bootstrapDatabaseFill,
      bootstrapGlobe2,
      bootstrapShieldCheck,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapSpeedometer2,
      bootstrapCloudCheckFill,
      bootstrapCpuFill,
      bootstrapActivity
    })
  ]
})
export class DynamicCartographyComponent {
  selectedEnvironment = signal<'prod-cloud' | 'staging-mesh' | 'hybrid-dc'>('prod-cloud');
  selectedNodeId = signal<string>('order-service');

  nodes: TopologyNode[] = [
    { id: 'api-gateway', label: 'API Gateway (Spring Cloud)', category: 'GATEWAY', instancesCount: 4, avgLatencyMs: 8.2, rps: 4200, errorRatePct: 0.02, health: 'HEALTHY' },
    { id: 'auth-service', label: 'Auth & JWT Service', category: 'SERVICE', instancesCount: 3, avgLatencyMs: 14.5, rps: 1200, errorRatePct: 0.0, health: 'HEALTHY' },
    { id: 'order-service', label: 'Order Processing Engine', category: 'SERVICE', instancesCount: 6, avgLatencyMs: 48.0, rps: 2800, errorRatePct: 0.15, health: 'HEALTHY' },
    { id: 'payment-service', label: 'Payment Gateway Client', category: 'SERVICE', instancesCount: 4, avgLatencyMs: 380.0, rps: 850, errorRatePct: 2.1, health: 'WARNING' },
    { id: 'postgres-db', label: 'PostgreSQL Cluster (Primary + Read)', category: 'DATABASE', instancesCount: 2, avgLatencyMs: 3.8, rps: 8900, errorRatePct: 0.0, health: 'HEALTHY' },
    { id: 'kafka-broker', label: 'Apache Kafka Event Bus', category: 'BROKER', instancesCount: 3, avgLatencyMs: 2.1, rps: 15400, errorRatePct: 0.0, health: 'HEALTHY' },
    { id: 'stripe-api', label: 'Stripe External Payment API', category: 'EXTERNAL', instancesCount: 1, avgLatencyMs: 420.0, rps: 420, errorRatePct: 1.8, health: 'WARNING' }
  ];

  links: TopologyLink[] = [
    { from: 'api-gateway', to: 'auth-service', protocol: 'HTTP/2 (mTLS)', trafficVolumeRps: 1200, latencyMs: 12 },
    { from: 'api-gateway', to: 'order-service', protocol: 'HTTP/2 (mTLS)', trafficVolumeRps: 2800, latencyMs: 18 },
    { from: 'order-service', to: 'payment-service', protocol: 'gRPC', trafficVolumeRps: 850, latencyMs: 22 },
    { from: 'order-service', to: 'postgres-db', protocol: 'JDBC / TCP', trafficVolumeRps: 5600, latencyMs: 4 },
    { from: 'order-service', to: 'kafka-broker', protocol: 'TCP (Kafka Wire)', trafficVolumeRps: 3400, latencyMs: 3 },
    { from: 'payment-service', to: 'stripe-api', protocol: 'HTTPS (REST)', trafficVolumeRps: 420, latencyMs: 380 }
  ];

  constructor(private router: Router) {}

  selectNode(id: string): void {
    this.selectedNodeId.set(id);
  }

  setEnvironment(env: 'prod-cloud' | 'staging-mesh' | 'hybrid-dc'): void {
    this.selectedEnvironment.set(env);
  }

  getSelectedNode(): TopologyNode {
    return this.nodes.find(n => n.id === this.selectedNodeId()) || this.nodes[0];
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
