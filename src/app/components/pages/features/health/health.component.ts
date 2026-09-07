import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  selector: 'app-health',
  styleUrls: ['./health.component.scss'],
  templateUrl: './health.component.html',
  standalone: true,
})
export class HealthComponent {}
