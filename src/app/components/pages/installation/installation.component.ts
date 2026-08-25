import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.scss',
  imports: [
    MarkdownComponent
  ]
})
export class InstallationComponent {
  protected readonly translate = inject(TranslateService);


  constructor() {
  }

}
