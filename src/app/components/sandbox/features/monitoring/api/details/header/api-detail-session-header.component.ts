import { Component, signal } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SessionStatus, statuses } from '@shared/constants';

@Component({
  selector: 'detail-session-header',
  templateUrl: './api-detail-session-header.component.html',
  styleUrls: ['./api-detail-session-header.component.scss'],
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatButtonModule],
  standalone: true,
})
export class ApiDetailSessionHeaderComponent {
  private currentStatusIndex = 0;
  readonly currentStatus = signal<SessionStatus>('success');

  cycleStatus(): void {
    this.currentStatusIndex = (this.currentStatusIndex + 1) % statuses.length;
    this.currentStatus.set(statuses[this.currentStatusIndex]);
  }
}
