import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  selector: 'app-components',
  styleUrls: ['./components.component.scss'],
  templateUrl: './components.component.html',
  standalone: true,
})
export class ComponentsComponent {}
