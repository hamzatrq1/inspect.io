import { RouterModule, Routes } from '@angular/router';
import { InstallationComponent } from './components/pages/installation/installation.component';
import { NgModule } from '@angular/core';
import { ApplicationComponent } from './components/pages/architecture/application/application.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ArchitectureComponent } from './components/pages/architecture/architecture.component';
import { FeaturesComponent } from '@app/components/pages/features/features.component';
import { CollectorComponent } from './components/pages/architecture/collector/collector.component';
import { ServerComponent } from './components/pages/architecture/server/server.component';
import { CompatibilitiesComponent } from './components/pages/compatibilities/compatibilities.component';
import { ComponentsComponent } from '@app/components/pages/components/components.component';
import { MonitoringComponent } from '@app/components/pages/features/monitoring/monitoring.component';
import { E2eComponent } from '@app/components/pages/features/e2e/e2e.component';
import { AnalyticsComponent } from '@app/components/pages/features/analytics/analytics.component';
import { HealthComponent } from '@app/components/pages/features/health/health.component';
import { AutonomyComponent } from '@app/components/pages/features/autonomy/autonomy.component';
import { ApiComponent } from '@app/components/pages/features/monitoring/api/api.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'features/monitoring', component: MonitoringComponent },
  { path: 'features/monitoring/api', component: ApiComponent },
  { path: 'features/e2e', component: E2eComponent },
  { path: 'features/analytics', component: AnalyticsComponent },
  { path: 'features/health', component: HealthComponent },
  { path: 'features/autonomy', component: AutonomyComponent },
  { path: 'installation', component: InstallationComponent },
  { path: 'compatibilities', component: CompatibilitiesComponent },
  { path: 'architecture', component: ArchitectureComponent },
  { path: 'architecture/application', component: ApplicationComponent },
  { path: 'architecture/collector', component: CollectorComponent },
  { path: 'architecture/server', component: ServerComponent },
  { path: 'components', component: ComponentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
