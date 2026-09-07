import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ApiDetailSessionContent
} from '@app/components/sandbox/features/monitoring/api/details/content/api-detail-session-content.component';
import { TreeComponent } from '@app/components/sandbox/features/e2e/tree/tree.component';

@Component({
  imports: [TranslateModule, ApiDetailSessionContent, TreeComponent],
  selector: 'app-e2e',
  styleUrls: ['./e2e.component.scss'],
  templateUrl: './e2e.component.html',
  standalone: true,
})
export class E2eComponent {}
