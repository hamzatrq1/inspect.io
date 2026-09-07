import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  imports: [MarkdownModule, TranslateModule],
  selector: 'app-collector',
  styleUrls: ['./collector.component.scss'],
  templateUrl: './collector.component.html',
  standalone: true,
})
export class CollectorComponent {
  protected readonly translate = inject(TranslateService);
}
