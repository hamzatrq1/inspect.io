import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-collector',
  styleUrls: ['./collector.component.scss'],
  templateUrl: './collector.component.html',
})
export class CollectorComponent {
  protected readonly translate = inject(TranslateService);
}
