import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-monitoring',
  styleUrls: ['./monitoring.component.scss'],
  templateUrl: './monitoring.component.html',
})
export class MonitoringComponent {}
