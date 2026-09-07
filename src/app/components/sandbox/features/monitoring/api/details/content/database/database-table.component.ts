import { Component, EventEmitter, Input, Output } from "@angular/core";
import { JqtCellDefDirective, TableComponent, TableProvider } from '@oneteme/jquery-table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, NgIf } from '@angular/common';
import { DurationPipe } from '@shared/pipe/duration.pipe';
import { TypeColumnFormatPipe } from '@shared/pipe/type-column-format';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'database-table',
  templateUrl: './database-table.component.html',
  imports: [
    MatProgressSpinnerModule,
    TableComponent,
    DatePipe,
    DurationPipe,
    TypeColumnFormatPipe,
    MatTooltipModule,
    JqtCellDefDirective,
    NgIf
  ],
  standalone: true,
  styleUrls: ['./database-table.component.scss']
})
export class DatabaseTableComponent {
  _requests: any[] = [];
  tableConfig: TableProvider<any> = {
    search: { enabled: true },
    view: { enabled: true, enableColumnRemoval: true },
    pagination: { enabled: true, pageSize: 10, pageSizeOptions: [5, 10, 20] },
    labels: { empty: 'Aucun résultat', loading: 'Chargement...' },
    columns: [
      { key: 'host', header: 'Hôte', icon: 'dns' },
      { key: 'command', header: 'Commande', icon: 'category' },
      { key: 'schema', header: 'Schéma/Table' },
      { key: 'productName', header: 'Base de données', optional: true, icon: 'storage' },
      { key: 'user', header: 'Utilisateur', icon: 'person' },
      { key: 'failed', header: 'Statut', value: (row) => row.failed ? 'KO' : 'OK' }
    ],
    // @ts-ignore
    onRowSelected: (row, event) => this.onClickRow.emit({ event, row: row.id })
  };

  @Input() isLoading: boolean = false;
  @Input() requests: any[] = [
    { id: 'db-1', host: 'pg-cluster-01', command: 'SELECT', schema: 'app_users', productName: 'PostgreSQL', user: 'app_user', start: 1725450000, end: 1725450000.045, failed: false },
    { id: 'db-2', host: 'pg-cluster-01', command: 'UPDATE', schema: 'orders', productName: 'PostgreSQL', user: 'app_user', start: 1725450002, end: 1725450002.320, failed: true }
  ];
  @Output() onClickRow = new EventEmitter<{ event: MouseEvent, row: string }>();
}
