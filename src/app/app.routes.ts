import {RouterModule, Routes} from '@angular/router';
import {InstallationComponent} from './components/pages/installation/installation.component';
import {NgModule} from '@angular/core';
import { ApplicationComponent } from './components/pages/architecture/application/application.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ArchitectureComponent} from './components/pages/architecture/architecture.component';
import {DemoComponent} from './components/pages/demo/demo.component';
import { CollectorComponent } from './components/pages/architecture/collector/collector.component';
import { ServerComponent } from './components/pages/architecture/server/server.component';
import { CompatibilitiesComponent } from './components/pages/compatibilities/compatibilities.component';
import { ComponentsComponent } from '@app/components/pages/components/components.component';
import { SessionsComponent } from '@app/components/pages/components/sessions/sessions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'installation', component: InstallationComponent },
  { path: 'demonstration', component: DemoComponent },
  { path: 'compatibilities', component: CompatibilitiesComponent },
  { path: 'architecture', component: ArchitectureComponent },
  { path: 'architecture/application', component: ApplicationComponent },
  { path: 'architecture/collector', component: CollectorComponent },
  { path: 'architecture/server', component: ServerComponent },
  { path: 'components', component: ComponentsComponent},
  { path: 'components/session', component: SessionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
