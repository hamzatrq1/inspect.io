import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-health',
  styleUrls: ['./health.component.scss'],
  templateUrl: './health.component.html',
})
export class HealthComponent {}
