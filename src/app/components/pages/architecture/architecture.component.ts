import {Component, inject} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-architecture',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
})
export class ArchitectureComponent {
  protected readonly translate = inject(TranslateService);
}
