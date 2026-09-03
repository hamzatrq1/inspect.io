import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-traceability',
  styleUrls: ['./traceability.component.scss'],
  templateUrl: './traceability.component.html',
})
export class TraceabilityComponent {}
