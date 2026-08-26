import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftStartOnRectangleMicro } from '@ng-icons/heroicons/micro';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowLeftStartOnRectangleMicro })],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
