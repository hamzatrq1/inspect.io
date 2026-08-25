import {RouterModule, Routes} from '@angular/router';
import {InstallationComponent} from './components/pages/installation/installation.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/pages/home/home.component';
import {ArchitectureComponent} from './components/pages/architecture/architecture.component';
import {DemoComponent} from './components/pages/demo/demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'installation', component: InstallationComponent },
  { path: 'demonstration', component: DemoComponent },
  { path: 'architecture', component: ArchitectureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
