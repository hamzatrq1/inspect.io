import { afterNextRender, Component, inject} from '@angular/core';
import { TranslatePipe, TranslateService} from '@ngx-translate/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-architecture',
  imports: [TranslatePipe],
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
})
export class ArchitectureComponent {
  protected readonly translate = inject(TranslateService);

  constructor() {
    afterNextRender({
      read: () => {
        void mermaid.run();
      },
    });
  }
}
