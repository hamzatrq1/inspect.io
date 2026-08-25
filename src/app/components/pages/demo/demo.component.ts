import {Component, inject} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-demo',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  protected readonly translate = inject(TranslateService);

}
