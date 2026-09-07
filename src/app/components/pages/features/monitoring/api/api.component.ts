import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ApiDetailSessionHeaderComponent
} from '@app/components/sandbox/features/monitoring/api/details/header/api-detail-session-header.component';
import {
  ApiDetailSessionContent
} from '@app/components/sandbox/features/monitoring/api/details/content/api-detail-session-content.component';


@Component({
  imports: [TranslateModule, ApiDetailSessionHeaderComponent, ApiDetailSessionContent],
  selector: 'app-api',
  styleUrls: ['./api.component.scss'],
  templateUrl: './api.component.html',
  standalone: true,
})
export class ApiComponent {}
