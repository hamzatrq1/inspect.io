import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JqtCellDefDirective, TableComponent, TableProvider } from '@oneteme/jquery-table';
import { DatePipe, DecimalPipe, NgIf, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { TypeColumnFormatPipe } from '@shared/pipe/type-column-format';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    MatTooltipModule,
    DecimalPipe,
    DatePipe,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf,
    JqtCellDefDirective,
    MatButtonModule,
    NgStyle,
    TypeColumnFormatPipe,
    TranslateModule,
  ],
})
export class RestTableComponent {
  tableConfig: TableProvider<any> = {
    search: { enabled: true },
    view: { enabled: true, enableColumnRemoval: true },
    pagination: { enabled: true, pageSize: 10 },
    labels: { empty: 'Aucun résultat', loading: 'Chargement...' },
    columns: [
      { key: 'host', header: 'Hôte', icon: 'dns' },
      { key: 'resource', header: 'Ressource', icon: 'category' },
      { key: 'start', header: 'Début', icon: 'schedule' },
      { key: 'delay', header: 'Durée', icon: 'timer' },
      { key: 'user', header: 'Utilisateur', icon: 'person' },
      { key: 'status', header: 'Statut', icon: 'task_alt' },
      { key: 'action', header: 'Action', icon: 'touch_app' },
      { key: 'threadName', header: 'Thread', optional: true, icon: 'memory' },
      { key: 'exception', header: 'Exception', optional: true, icon: 'error_outline' },

],
    rowClass: (row: any) => {
      if (row.status >= 500) return 'row-ko';
      if (row.status >= 400) return 'row-warning';
      return 'row-ok';
    },
    // @ts-ignore
    onRowSelected: (row, event) => this.onClickRow.emit({ event, row: row.id }),
  };

  @Input() isLoading: boolean = false;
  @Input() hostTooltip?: string | ((row: any) => string);
  @Input() requests: any[] = [
    {
      id: 'rest-1',
      host: 'auth-service',
      method: 'POST',
      path: 'api/v1/resources',
      status: 200,
      user: 'JM0001',
      start: 1725450000,
      end: 1725450000.12,
      action: '',
    },
    {
      id: 'rest-2',
      host: 'order-service',
      method: 'GET',
      path: 'api/v1/resources',
      status: 200,
      user: 'JM0001',
      start: 1725450001,
      end: 1725450001.05,
      action: '',
    },
    {
      id: 'rest-3',
      host: 'stock-service',
      method: 'PUT',
      path: 'api/v1/resources',
      status: 500,
      user: 'JM0001',
      start: 1725450003,
      end: 1725450003.8,
      action: '',
    },
  ];

  @Output() onClickRow = new EventEmitter<{ event: MouseEvent; row: string }>();
  @Output() onClickRemote = new EventEmitter<{ event: MouseEvent; row: string }>();
}
