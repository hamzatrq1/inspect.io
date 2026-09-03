import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-e2e',
  styleUrls: ['./e2e.component.scss'],
  templateUrl: './e2e.component.html',
})
export class E2eComponent {}
