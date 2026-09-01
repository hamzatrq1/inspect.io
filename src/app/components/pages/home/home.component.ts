import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftStartOnRectangleMicro } from '@ng-icons/heroicons/micro';
import { bootstrapArrowDown } from '@ng-icons/bootstrap-icons';
import { goToPage, isAtBottom } from '@utils/utils';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroArrowLeftStartOnRectangleMicro,
      bootstrapArrowDown,
    }),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[class.home-transitioning]': 'isTransitioning()',
  },
})
export class HomeComponent {
  private readonly router = inject(Router);
  isTransitioning = signal(false);
  private touchStartY = 0;
  private scrollCount = 0;

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.isTransitioning()) {
      return;
    }

    if (event.deltaY > 50 && isAtBottom()) {
      this.goToInstallation();
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.isTransitioning()) {
      return;
    }

    const currentY = event.touches[0]?.clientY ?? 0;
    const deltaY = this.touchStartY - currentY;

    if (deltaY > 50 && isAtBottom()) {
      this.goToInstallation();
    }
  }

  goToInstallation(): void {
    goToPage(this.isTransitioning(), this.router, '/installation');
  }
}
