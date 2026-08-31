import {RouterModule, Routes} from '@angular/router';
import {InstallationComponent} from './components/pages/installation/installation.component';
import {NgModule} from '@angular/core';
import { ApplicationComponent } from './components/pages/architecture/application/application.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ArchitectureComponent} from './components/pages/architecture/architecture.component';
import {DemoComponent} from './components/pages/demo/demo.component';
import { CollectorComponent } from './components/pages/architecture/collector/collector.component';
import { ServerComponent } from './components/pages/architecture/server/server.component';
import { DependenciesComponent } from './components/pages/dependencies/dependencies.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'installation', component: InstallationComponent },
  { path: 'demonstration', component: DemoComponent },
  { path: 'dependencies', component: DependenciesComponent },
  { path: 'architecture', component: ArchitectureComponent },
  { path: 'architecture/application', component: ApplicationComponent },
  { path: 'architecture/collector', component: CollectorComponent },
  { path: 'architecture/server', component: ServerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
