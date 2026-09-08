import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  selector: 'app-metrics',
  styleUrls: ['./metrics.component.scss'],
  templateUrl: './metrics.component.html',
  standalone: true,
})
export class MetricsComponent {}
