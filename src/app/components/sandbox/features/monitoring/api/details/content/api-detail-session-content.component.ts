import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberFormatterPipe } from '@shared/pipe/number.pipe';
import { TabData } from '@shared/constants';
import {
  RestTableComponent
} from '@app/components/sandbox/features/monitoring/api/details/content/rest/rest-table.component';
import {
  TimelineComponent
} from '@app/components/sandbox/features/monitoring/api/details/content/timeline/timeline.component';
import {
  DatabaseTableComponent
} from '@app/components/sandbox/features/monitoring/api/details/content/database/database-table.component';


@Component({
  selector: 'detail-session-content',
  templateUrl: './api-detail-session-content.component.html',
  styleUrls: ['./api-detail-session-content.component.scss'],
  imports: [CommonModule, MatIconModule, MatTooltipModule, NumberFormatterPipe, RestTableComponent, TimelineComponent, DatabaseTableComponent],
  standalone: true,
})
export class ApiDetailSessionContent implements OnInit {
  selectedTabType: string = '';
  tabs: TabData[] = [];
  @Input() config?: string;


  session: any = {
    restRequests: [
      { id: '1', method: 'GET', url: '/api/v1/users', status: 200, duration: 45 },
      { id: '2', method: 'POST', url: '/api/v1/auth/login', status: 401, duration: 120 },
      { id: '3', method: 'GET', url: '/api/v1/orders', status: 500, duration: 320 },
    ],
    databaseRequests: [],
    ftpRequests: [{ id: 'ftp-1', file: 'export_2026.csv', duration: 210, failed: false }],
    mailRequests: [
      { id: 'mail-1', to: 'client@example.com', subject: 'Notification', failed: false },
    ],
    ldapRequests: [{ id: 'ldap-1', dn: 'uid=john.doe,ou=users,dc=company,dc=com', failed: false }],
    localRequests: [],
    httpSessionStages: [
      { stage: 'INIT', timestamp: 1725450000 },
      { stage: 'PROCESS', timestamp: 1725450005 },
    ],
    userActions: [{ action: 'CLICK_BUTTON', target: '#submit-order' }],
    logEntries: [
      { level: 'INFO', message: 'Session initialisée avec succès' },
      { level: 'WARN', message: 'Temps de réponse élevé sur /orders' },
    ],
  };

  trackByTab(index: number, tab: TabData): string {
    return tab.type;
  }

  ngOnInit() {
    this.tabs = [
      {
        label: 'HTTP',
        icon: 'call_made',
        count: this.session.restRequests.length,
        visible: this.config === 'monitoring',
        type: 'rest',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'JDBC',
        icon: 'database',
        count: this.session.databaseRequests.length,
        visible: this.config === 'monitoring',
        type: 'database',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'FTP',
        icon: 'smb_share',
        count: this.session.ftpRequests.length,
        visible: this.config === 'monitoring',
        type: 'ftp',
        hasError: true,
        errorCount: 1,
      },
      {
        label: 'SMTP',
        icon: 'outgoing_mail',
        count: this.session.mailRequests.length,
        visible: this.config === 'monitoring',
        type: 'smtp',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'LDAP',
        icon: 'user_attributes',
        count: this.session.ldapRequests.length,
        visible: this.config === 'monitoring',
        type: 'ldap',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'LOCAL',
        icon: 'memory',
        count: this.session.localRequests.length,
        visible: this.config != 'monitoring' && this.config != 'e2e',
        type: 'local',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'Stage',
        icon: 'view_object_track',
        count: this.session.httpSessionStages.length,
        visible: this.config === 'monitoring',
        type: 'stage',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'Action',
        icon: 'web_traffic',
        count: this.session.userActions.length,
        visible: false,
        type: 'action',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'Log',
        icon: 'chat_info',
        count: this.session.logEntries.length,
        visible: this.config === 'monitoring',
        type: 'log',
        hasError: false,
        errorCount: 0,
      },
      {
        label: 'Chronologie',
        icon: 'view_timeline',
        count: 0,
        visible: this.config === 'e2e',
        type: 'timeline',
        hasError: false,
        errorCount: 0,
      },
    ];

    const firstVisible = this.tabs.find((t) => t.visible);
    if (firstVisible) {
      if (this.config === 'e2e') {
        this.selectedTabType = 'timeline';
      }
      else {
        this.selectedTabType = firstVisible.type;
      }
    }
  }

  selectTab(type: string) {
    this.selectedTabType = type;
  }
}
