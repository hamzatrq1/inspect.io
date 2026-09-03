import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-components',
  styleUrls: ['./components.component.scss'],
  templateUrl: './components.component.html',
})
export class ComponentsComponent {}
