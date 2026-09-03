import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-analytics',
  styleUrls: ['./analytics.component.scss'],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {}
