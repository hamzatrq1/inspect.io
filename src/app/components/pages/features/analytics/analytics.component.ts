import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  selector: 'app-analytics',
  styleUrls: ['./analytics.component.scss'],
  templateUrl: './analytics.component.html',
  standalone: true,
})
export class AnalyticsComponent {}
