import { Component, Input, OnInit } from "@angular/core";
import { DataGroup, DataItem, TimelineOptions } from "vis-timeline";

@Component({
  selector: 'timeline',
  standalone: true,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  activeFilters = new Set<string>(['rest', 'ftp', 'smtp', 'ldap', 'jdbc', 'local', 'action']);

  options: TimelineOptions = {
    clickToUse: true,
    selectable: false,
    margin: { item: { horizontal: -1 } }
  };

  dataGroups: DataGroup[] = [
    { id: 'http-nio-exec-1', content: 'Thread: http-nio-exec-1' },
    { id: 'async-worker-2', content: 'Thread: async-worker-2' }
  ];

  dataItems: DataItem[] = [
    { id: 1, group: 'http-nio-exec-1', content: 'POST /auth/login', start: new Date(Date.now() - 5000), end: new Date(Date.now() - 4800), className: 'rest' },
    { id: 2, group: 'http-nio-exec-1', content: 'SELECT * FROM users', start: new Date(Date.now() - 4700), end: new Date(Date.now() - 4650), className: 'jdbc' },
    { id: 3, group: 'async-worker-2', content: 'SMTP: Confirmation mail', start: new Date(Date.now() - 4000), end: new Date(Date.now() - 3600), className: 'smtp' },
    { id: 4, group: 'async-worker-2', content: 'FTP Upload report', start: new Date(Date.now() - 3500), end: new Date(Date.now() - 2800), className: 'ftp' }
  ];

  @Input() request: any;
  @Input() instance: any;

  ngOnInit() {
    this.options = {
      ...this.options,
      start: new Date(Date.now() - 6000),
      end: new Date(Date.now() + 1000)
    };
  }

  isFilterActive(type: string): boolean {
    return this.activeFilters.has(type);
  }

  toggleFilter(type: string): void {
    if (this.activeFilters.has(type)) {
      this.activeFilters.delete(type);
    } else {
      this.activeFilters.add(type);
    }
  }

  onTimelineCreate(timeline: any) {
    // Événement après initialisation vis-timeline
  }

  onItemCLicked(event: any) {
    console.log('Élément de chronologie cliqué :', event);
  }
}
